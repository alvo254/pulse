variable "cidr_block" {
  description = "This is the vpc cidr"
  default = "10.5.0.0/16"
}

variable "project" {
  default = "pulse"
}

variable "environment" {
  default = "development"
}

variable "public_subnet"{
  default = "10.5.5.0/24"
}

variable "public_subnet_2" {
  default = "10.5.10.0/24"
}