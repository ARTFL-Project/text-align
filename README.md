# TextPAIR (Pairwise Alignment for Intertextual Relations)

TextPAIR is a scalable and high-performance sequence aligner for humanities text analysis designed to identify "similar passages" in large collections of texts. These may include direct quotations, plagiarism and other forms of borrowings, commonplace expressions and the like. It is a complete rewrite and rethink of the <a href="https://code.google.com/archive/p/text-pair/">original implementation</a> released in 2009.

While TextPAIR was developed in response to the fairly specific phenomenon of similar passages across literary works, the sequence analysis techniques employed in TextPAIR were developed in widely disparate fields, such as bioinformatics and computer science, with applications ranging from genome sequencing to plagiarism detection. TextPAIR generates a set of overlapping word sequence shingles for every text in a corpus, then stores and indexes that information to be analyzed against shingles from other texts. For example, the opening declaration from Rousseau's Du Contrat Social,

`"L'homme est né libre, est partout il est dans les fers. Tel se croit le maître des autres, qui ne laisse pas d'être plus esclave qu'eux,"`

would be rendered in trigram shingles (with lemmatization, accents flattened and function words removed) as:

```
homme_libre_partout
libre_partout_fer
partout_fer_croire
fer_croire_maitre
croire_maitre_laisser
maitre_laisser_esclave.
```

Common shingles across texts indicate many different types of textual borrowings, from direct citations to more ambiguous and unattributed usages of a passage. Using a simple search form, the user can quickly identify similar passages shared between different texts in one database, or even across databases. Using a simple search form, the user can quickly identify similar passages shared between different texts in one database, or even across databases.

![alt text](example.png)

## Installation

Note that TextPair will only run on 64 bit Linux and MacOS. Windows will NOT be supported.

### Dependencies

-   Python 3.6 and up
-   Node and NPM
-   PostgreSQL: you will need to create a dedicated database and create a user with read/write permissions on that database. You will also need to create the pg_trgm extension on that database by running the following command in the PostgreSQL shell: `CREATE EXTENSION pg_trgm;` run as a superuser.
-   A running instance of Apache

### Install script

-   Run `install.sh` script. This should install all needed components
-   Make sure you include `/etc/text-pair/apache_wsgi.conf` in your main Apache configuration file to enable searching
-   Edit `/etc/text-pair/global_settings.ini` to provide your PostgreSQL user, database, and password.

## Quick start

Before running any alignment, make sure you edit your copy of `config.ini`. See [below](#configuring-the-alignment) for details

The sequence aligner is executed via the `textpair` command.

`textpair` takes the following command-line arguments:

-   `--config`: path to the configuration file where preprocessing, matching, and web application settings are set
-   `--source_files`: path to source files
-   `--source_metadata`: path to source metadata. Only define if not using a PhiloLogic database.
-   `--target_files`: path to target files. Only define if not using a PhiloLogic database.
-   `--target_metadata`: path to target metadata
-   `--is_philo_db`: Define if files are from a PhiloLogic database. If set to `True` metadata will be fetched using the PhiloLogic metadata index. Set to False by default.
-   `--output_path`: path to results
-   `--debug`: turn on debugging
-   `--workers`: Set number of workers/threads to use for parsing, ngram generation, and alignment.
-   `--load_web_app`: Define whether to load results into a database viewable via a web application. Set to True by default.

Example:

```console
textpair --source_files=/path/to/source/files --target_files=/path/to/target/files --config=config.ini --workers=6 --output_path=/path/to/output
```

## Configuring the alignment

When running an alignment, you need to provide a configuration file to the `textpair` command. You can find a generic copy of the file in `/var/lib/text-pair/config/config.ini`. You should copy this file to the directory from which you are starting the alignment. Then you can start editing this file. Note that all parameters have comments explaining their role. While most values are reasonable defaults and don't require any edits, you do have to provide a value for `table_name` in the Web Application section at the bottom of the file.

## Alignments using PhiloLogic databases

This currently uses the dev version of PhiloLogic5 to read PhiloLogic4 databases. So you'll need a version of PhiloLogic5 installed.
A future version will have that functionnality baked in.

To leverage a PhiloLogic database, use the `--is_philo_db` flag, and point to the `data/words_and_philo_ids` directory of the PhiloLogic DB used.
For instance, if the source DB is in `/var/www/html/philologic/source_db` and the target DB is in `/var/www/html/philologic/target_db`,
run the following:

```console
textpair --is_philo_db --source_files=/var/www/html/philologic/source_db/data/words_and_philo_ids/ --target_files=/var/www/html/philologic/target_db/data/words_and_philo_ids/ --workers=8 --config=config.ini
```

Note that the `--is_philo_db` flag assumes both source and target DBs are PhiloLogic databases.

## Run comparison between preprocessed files manually

It's possible run a comparison between documents without having to regenerate ngrams. In this case you need to use the
`--only_align` argument with the `textpair` command. Source files (and target files if doing a cross DB alignment) need to point
to the location of generated ngrams. You will also need to point to the `metadata.json` file which should be found in the `metadata`
directory found in the parent directory of your ngrams.

-   `--source_files`: path to source ngrams generated by `textpair`
-   `--target_files`: path to target ngrams generated by `textpair`. If this option is not defined, the comparison will be done between source files.
-   `--source_metadata`: path to source metadata, a required parameter
-   `--target_metadata`: path to target metadata, a required parameter if target files are defined.

Example: assuming source files are in `./source` and target files in `./target`:

```console
textpair --only_align --source_files=source/ngrams --source_metadata=source/metadata/metadata.json --target_files=target/ngrams --target_metadata=target/metadata/metadata.json --workers=10 --output_path=results/
```

## Configuring the Web Application

The `textpair` script automatically generates a Web Application, and does so by relying on the defaults configured in the `appConfig.json` file which is copied to the directory where the Web Application lives, typically `/var/www/html/text-pair/database_name`.

In this file, there are a number of fields that can be configured:

-   `webServer`: should not be changed as only Apache is supported for the foreseeable future.
-   `appPath`: this should match the WSGI configuration in `/etc/text-pair/apache_wsgi.conf`. Should not be changed without knowing how to work with `mod_wsgi`.
-   `databaseName`: Defines the name of the PostgreSQL database where the data lives.
-   `databaseLabel`: Name of the Web Application
-   `sourceDB` and `targetDB` both define contextual links using PhiloLogic. `philoDB` defines whether the contextual link should appear in results and `link` defines the URL of the PhiloLogic database.
-   `sourceLabel` and `targetLabel` are the names of source DB and target DB. This field supports HTML tags.
-   `metadataTypes`: defines the value type of field. Either `TEXT` or `INTEGER`.
-   `sourceCitation` and `targetCitation` define the bibliography citation in results. `field` defines the metadata field to use, and `style` is for CSS styling (using key/value for CSS rules)
-   `metadataFields` defines the fields available for searching in the search form for `source` and `target`. `label` is the name used in the form and `value` is the actual name of the metadata field as stored in the SQL database.
-   `facetFields` works the same way as `metadataFields` but for defining which fields are available in the faceted browser section.
-   `timeSeriesIntervals` defines the time intervals available for the time series functionnality.

Once you've edited these fields to your liking, you can regenerate your database by running the `npm run build` command from the directory where the `appConfig.json` file is located.

Built with support from the Mellon Foundation and the Fondation de la Maison des Sciences de l'Homme.
