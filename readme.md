# Refugee Filter

## How to generate the data from xlsx
-add new xlsx to correct directory containing reshape.py
-clean up xlsx removing empty rows, etc
-save xlsx as a csv
-remove excess spaces etc.
-`mkvirtualenv NAME` if one doesn't exist
-`workon NAME` to enter that virtual environment
-install python dependencies to this space (simplejson, etc.)
-change reshape.py to point to your csv

possible errors:
- [issues in the csv perhaps related to saving the csv as "mac" instead of windows type](https://stackoverflow.com/questions/17315635/csv-new-line-character-seen-in-unquoted-field-error)
- make sure to use python v3 for the utf-8 encoding