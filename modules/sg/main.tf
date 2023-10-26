resource "aws_security_group" "pulse" {
  name        = "pulse-sg"
  description = "my security group"
 
  vpc_id      = var.vpc_id

  ingress = [
    {
      description      = "HTTP"
      from_port        = 80
      to_port          = 80
      protocol         = "tcp"
      cidr_blocks      = ["0.0.0.0/0"]
      prefix_list_ids  = []
      security_groups  = []
      self             = false
      ipv6_cidr_blocks = ["::/0"]

  },
      {
      description      = "HTTS"
      from_port        = 443
      to_port          = 443
      protocol         = "tcp"
      cidr_blocks      = ["0.0.0.0/0"]
      prefix_list_ids  = []
      security_groups  = []
      self             = false
      ipv6_cidr_blocks = ["::/0"]

  },
  {
      description      = "SSH"
      from_port        = 22
      to_port          = 22
      protocol         = "tcp"
      //The /32 means use a single ip
      cidr_blocks      = ["197.248.165.198/32"] //Please change to your own IP address for this to work
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      security_groups  = []
      self             = false
  },
  ]

  egress = [
    {
      description      = "outgoing traffic"
      from_port        = 0
      to_port          = 0
      protocol         = "-1"
      cidr_blocks      = ["0.0.0.0/0"]
      ipv6_cidr_blocks = ["::/0"]
      prefix_list_ids  = []
      security_groups  = []
      self             = false
  }
  ]

  tags = {
    Name = "pulse_sg"
  }

}