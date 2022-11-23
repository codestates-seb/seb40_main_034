#!/usr/bin/env bash
cd /home/ssm-user/seb40_main_034/server/build
sudo nohup java -jar server-0.0.1-SNAPSHOT.jar > /dev/null 2> /dev/null < /dev/null &
