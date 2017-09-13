#!/usr/bin/env python3
"""Sequence aligner script"""

import argparse
import configparser
import os
import re
from ast import literal_eval
from glob import glob
from pathlib import Path
from collections import defaultdict

from utils.xml_parser import TEIParser

# from compare_ngrams import SequenceAligner
from generate_ngrams import Ngrams

TRIM_LAST_SLASH = re.compile(r'/\Z')


def parse_command_line():
    """Command line parsing function"""
    parser = argparse.ArgumentParser()
    parser.add_argument("--config", help="configuration file used to override defaults",
                        type=str, default="")
    parser.add_argument("--source_files", help="path to source files from which to compare",
                        type=str)
    parser.add_argument("--target_files", help="path to target files to compared to source files",
                        type=str, default="")
    parser.add_argument("--is_philo_db", help="define is files are from a PhiloLogic instance",
                        type=literal_eval, default=False)
    parser.add_argument("--source_metadata", help="path to source metadata if not from PhiloLogic instance",
                        type=str, default="")
    parser.add_argument("--target_metadata", help="path to target metadata if not from PhiloLogic instance",
                        type=str, default="")
    parser.add_argument("--output_path", help="output path for ngrams and sequence alignment",
                        type=str, default="./output")
    parser.add_argument("--workers", help="How many threads or cores to use for preprocessing and matching",
                        type=int, default=4)
    parser.add_argument("--debug", help="add debugging", action='store_true', default=False)
    args = vars(parser.parse_args())
    tei_parsing = {}
    preprocessing_params = {}
    matching_params = {}
    if args["config"]:
        if os.path.exists(args["config"]):
            config = configparser.ConfigParser()
            config.read(args["config"])
            for key, value in dict(config["TEI_PARSING"]).items():
                if key.startswith("parse"):
                    if value.lower() == "yes" or value.lower() == "true":
                        tei_parsing[key] = True
                    else:
                        tei_parsing[key] = False
                else:
                    if not value:
                        if key.startswith("output_source"):
                            value = Path(args["output_path"]).joinpath("source")
                        else:
                            value = Path(args["output_path"]).joinpath("target")
                    tei_parsing[key] = value
            for key, value in dict(config["PREPROCESSING"]).items():
                if key.endswith("object_level"):
                    preprocessing_params[key] = value
                elif value or key not in preprocessing_params:
                    if key == "ngram":
                        preprocessing_params[key] = int(value)
                    else:
                        preprocessing_params[key] = value
            for key, value in dict(config["MATCHING"]).items():
                if value or key not in matching_params:
                    matching_params[key] = value
    paths = {"source": {}, "target": defaultdict(str)}
    if tei_parsing["parse_source_files"] is True:
        paths["source"]["tei_input_files"] = args["source_files"]
        paths["source"]["parse_output"] = Path(args["output_path"]).joinpath("source")
        paths["source"]["input_files_for_ngrams"] = Path(args["output_path"]).joinpath("source/texts")
        paths["source"]["ngram_output_path"] = Path(args["output_path"]).joinpath("source/ngrams")
        paths["source"]["metadata_path"] = Path(args["output_path"]).joinpath("source/metadata/metadata.json")
        paths["source"]["is_philo_db"] = False
    else:
        paths["source"]["input_files_for_ngrams"] = args["source_files"]
        paths["source"]["ngram_output_path"] = Path(args["output_path"]).joinpath("source/ngrams")
        paths["source"]["metadata_path"] = Path(args["output_path"]).joinpath("source/metadata/metadata.json")
        paths["source"]["is_philo_db"] = args["is_philo_db"]
    if args["target_files"]:
        if tei_parsing["parse_target_files"] is True:
            paths["target"]["tei_input_files"] = args["target_files"]
            paths["target"]["parse_output"] = Path(args["output_path"]).joinpath("target")
            paths["target"]["input_files_for_ngrams"] = Path(args["output_path"]).joinpath("target/texts")
            paths["target"]["ngram_output_path"] = Path(args["output_path"]).joinpath("target/ngrams")
            paths["target"]["metadata_path"] = Path(args["output_path"]).joinpath("target/metadata/metadata.json")
            paths["target"]["is_philo_db"] = False
        else:
            paths["target"]["input_files_for_ngrams"] = args["target_files"]
            paths["target"]["ngram_output_path"] = Path(args["output_path"]).joinpath("target/ngrams")
            paths["target"]["metadata_path"] = Path(args["output_path"]).joinpath("target/metadata/metadata.json")
            paths["target"]["is_philo_db"] = args["is_philo_db"]
    preprocessing_params = {"source": preprocessing_params, "target": preprocessing_params}
    preprocessing_params["source"]["text_object_level"] = preprocessing_params["source"]["source_text_object_level"]
    del preprocessing_params["source"]["source_text_object_level"]
    preprocessing_params["target"]["text_object_level"] = preprocessing_params["target"]["target_text_object_level"]
    del preprocessing_params["target"]["target_text_object_level"]
    return paths, tei_parsing, preprocessing_params, matching_params, args["output_path"], args["workers"], args["debug"]

def main():
    """Main function to start sequence alignment"""
    paths, tei_parsing, preprocessing_params, matching_params, output_path, workers, debug = parse_command_line()
    for var in [paths, tei_parsing, preprocessing_params, matching_params, output_path, workers, debug]:
        print("\n", var)
    if tei_parsing["parse_source_files"] is True:
        print("\n### Parsing source TEI files ###")
        parser = TEIParser(paths["source"]["tei_input_files"], output_path=paths["source"]["parse_output"], cores=workers, debug=debug)
        parser.get_metadata()
        parser.get_text()
    print("\n### Generating source ngrams ###")
    ngrams = Ngrams(**preprocessing_params["source"], debug=debug)
    ngrams.generate(paths["source"]["input_files_for_ngrams"], paths["source"]["ngram_output_path"],
                    metadata=paths["source"]["metadata_path"], workers=workers)
    if paths["target"]:
        if tei_parsing["parse_target_files"] is True:
            print("\n### Parsing source TEI files ###")
            parser = TEIParser(paths["target"]["tei_input_files"], output_path=paths["target"]["parse_output"], cores=workers, debug=debug)
            parser.get_metadata()
            parser.get_text()
        print("\n### Generating target ngrams ###")
        ngrams = Ngrams(**preprocessing_params["target"], debug=debug)
        ngrams.generate(paths["target"]["input_files_for_ngrams"], paths["target"]["ngram_output_path"],
                        metadata=paths["target"]["metadata_path"], workers=workers)
    print("\n### Starting sequence alignment ###")
    if matching_params:
        os.system("./compareNgrams \
                  --output_path={} \
                  --threads={} \
                  --source_files={} \
                  --target_files={} \
                  --source_metadata={} \
                  --target_metadata={} \
                  --sort_by={} \
                  --source_batch={} \
                  --target_batch={} \
                  --source_common_ngrams={} \
                  --target_common_ngrams={} \
                  --most_common_ngram_threshold={} \
                  --common_ngrams_limit={} \
                  --matching_window_size={} \
                  --max_gap={} \
                  --minimum_matching_ngrams={} \
                  --minimum_matching_ngrams_in_window={} \
                  --minimum_matching_ngrams_in_docs={} \
                  --context_size={} \
                  --banal_ngrams={} \
                  --duplicate_threshold={} \
                  --merge_passages_on_byte_distance={} \
                  --merge_passages_on_ngram_distance={} \
                  --passage_distance_multiplier={} \
                  --one_way_matching={} \
                  --debug={} \
                  --ngram_index={}"
                  .format(
                      Path(output_path).joinpath("results"),
                      workers,
                      paths["source"]["ngram_output_path"],
                      paths["target"]["ngram_output_path"],
                      paths["source"]["metadata_path"],
                      paths["target"]["metadata_path"],
                      matching_params["sort_by"],
                      matching_params["source_batch"],
                      matching_params["target_batch"],
                      matching_params["source_common_ngrams"],
                      matching_params["target_common_ngrams"],
                      matching_params["most_common_ngram_threshold"],
                      matching_params["common_ngrams_limit"],
                      matching_params["matching_window_size"],
                      matching_params["max_gap"],
                      matching_params["minimum_matching_ngrams"],
                      matching_params["minimum_matching_ngrams_in_window"],
                      matching_params["minimum_matching_ngrams_in_docs"],
                      matching_params["context_size"],
                      matching_params["banal_ngrams"],
                      matching_params["duplicate_threshold"],
                      matching_params["merge_passages_on_byte_distance"],
                      matching_params["merge_passages_on_ngram_distance"],
                      matching_params["passage_distance_multiplier"],
                      str(matching_params["one_way_matching"]).lower(),
                      str(debug).lower(),
                      matching_params["ngram_index"],
                  ))
    else:
        os.system("./compareNgrams \
                  --output_path={} \
                  --source_files={} \
                  --target_files={} \
                  --source_metadata={}/metadata/metadata.json \
                  --target_metadata={}/metadata/metadata.json \
                  --debug={}"
                  .format(
                      Path(output_path).joinpath("results"),
                      paths["source"]["ngram_output_path"],
                      paths["target"]["ngram_output_path"],
                      paths["source"]["metadata_path"],
                      paths["target"]["metadata_path"],
                      str(debug).lower()
                  ))

if __name__ == '__main__':
    main()
