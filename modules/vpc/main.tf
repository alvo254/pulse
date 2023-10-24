resource "aws_vpc" "vpc" {
    cidr_block = var.cidr_block
    instance_tenancy = "default"
    enable_dns_hostnames = true

    tags = {
        Name = "${var.project}-${var.environment}-vpc"
    }
}

data "aws_availability_zones" "available_zones" {}


resource "aws_subnet" "public_subnet1" {
    vpc_id = aws_vpc.vpc.id
    cidr_block = var.public_subnet
    map_public_ip_on_launch = true
    availability_zone       = data.aws_availability_zones.available_zones.names[0]  //this is indexing

    tags = {
        Name = "${var.project}-${var.environment}-subnet"
    }
}

resource "aws_subnet" "public_subnet_az1" {
    vpc_id                  = aws_vpc.vpc.id
    cidr_block              = var.public_subnet_2
    availability_zone       = data.aws_availability_zones.available_zones.names[1]  

    //resources launched with this will have a public ip address
    map_public_ip_on_launch = true

    tags = {
        Name = "${var.project}-${var.environment}-public-az1"
    }
}

resource "aws_internet_gateway" "internet_gateway" {
  vpc_id = aws_vpc.vpc.id

  tags = {
    Name = "${var.project}-${var.environment}-igw"
  }
}

resource "aws_route_table" "public_route_table" {
    vpc_id = aws_vpc.vpc.id

    route {
        cidr_block = "0.0.0.0/0"
        gateway_id = aws_internet_gateway.internet_gateway.id
    }

    tags = {
        Name = "${var.project}-${var.environment}-public-rt"
    }
}


resource "aws_route_table_association" "public_subnet_az1_rt_association" {
    subnet_id      = aws_subnet.public_subnet1.id
    route_table_id = aws_route_table.public_route_table.id
}

# associate public subnet az2 to "public route table"
resource "aws_route_table_association" "public_subnet_2_rt_association" {
    subnet_id      = aws_subnet.public_subnet_az1.id
    route_table_id = aws_route_table.public_route_table.id
}