resource "aws_instance" "pulse-dev" {
    ami = "ami-053b0d53c279acc90"
    instance_type = "t2.micro"
    
    subnet_id = var.subnet
    key_name = "${aws_key_pair.pulse-key.key_name}"

    user_data = data.template_file.user_data.rendered


    vpc_security_group_ids = [var.security_group]


    tags = {
        Name = "pulse"
    }
}

resource "aws_key_pair" "pulse-key" {
  key_name = "pulse-key"
  //storing ssh key on the server
  public_key = tls_private_key.RSA.public_key_openssh
}


resource "tls_private_key" "RSA" {
  algorithm = "RSA"
  rsa_bits = 4096
}

resource "local_file" "alvo-ssh-keys" {
	# content = tls_private_key.RSA.private_key_pem
	content = tls_private_key.RSA.private_key_pem
	filename = "pulse-key.pem"
}

data "template_file" "user_data" {
  template = file("${path.module}/staff.sh")
}