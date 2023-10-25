# Tweety quickstart
Follow the instructions from the repo here https://github.com/mahrtayyab/tweety

```sh
pip install tweety-ns
```

## Provisioning simple lambda function with eventbridge
Here we are using bash script to automate the process. Later we will transform to terraform.
Also in aws cli commands I have a flag `--profile cil-c501` which I set for one of my aws configurations. Please make sure to update it
with your correct profile on your end or remove this flag entirely if you only have a single default profile set.

To run the commands below successfully make sure you are in the tweetycode directory

Run the commands below to package and provision the lambda function, add python layer to it and also attach an eventbridge rule to the lambda function.
The complete code for the lambda function is in the [lambda](./lambda/) directory

```sh
chmod u+x setup_infra.sh
./setup_infra.sh tweets-pull-s3-609806490186
```

To clean the provision resources after testing, run the commands below. This deletes all service resources we provisioned during the test phase.

```sh
chmod u+x tear_down_infra.sh
./tear_down_infra.sh tweets-pull-s3-609806490186
```
