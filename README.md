# UAV Arena

## About

This repository is a part of the [ODM](https://github.com/OpenDroneMap) project and exists to give the user a comparision  of drone mapping software results compared side by side. feel free to compare the results between ODM, Drone Deploy, MetaShape, DroneMapper and Pix4D.

Currently, comparision consists of Orthophoto and DSM only. 

![image](https://user-images.githubusercontent.com/1951843/79274054-f7156480-7e71-11ea-8a67-c78c1ae42ec4.png)

## Datasets Used

| Name | # Images | Size (MB) | Coordinates in EXIF | GCP File | RTK | Notes |
| ------|----------|-----------|----------------------|---------------|----- | -- |
| [aukerman](https://github.com/OpenDroneMap/odm_data_aukerman/tree/master) | 77 | 543 | :heavy_check_mark: | :heavy_multiplication_x: | :heavy_multiplication_x:  |
| [brighton_beach](https://github.com/pierotofy/drone_dataset_brighton_beach/tree/master) | 18 | 62 | :heavy_check_mark: | :heavy_multiplication_x: | :heavy_multiplication_x: |
| [sand_key](https://github.com/pierotofy/drone_dataset_sand_key/tree/master) | 191 | 1100 | :heavy_check_mark: | :heavy_multiplication_x: | :heavy_multiplication_x: |


## Methodology

The results are processed for each software using using “medium quality” / default settings, 2 cm/px resolution.

## Contributing

run ` python -m http.server 8080 ` from the project root, then open a web browser, if you want to view this project locally. this action requires `Python3`.

If you want to add a new dataset, simply add the relevant folders in the `data` directory, edit `main.js`. The tiles can be generated using the instructions in `tile_commands.txt`.

## Disclaimer

While this is a neutral zone for evaluating the results of drone mapping software and we have performed processing following 
the same standards / quality settings for all solutions, this application was developed by [ODM](https://github.com/OpenDroneMap/ODM) contributors.

If you found a problem in one of the software results, submit a PR. 