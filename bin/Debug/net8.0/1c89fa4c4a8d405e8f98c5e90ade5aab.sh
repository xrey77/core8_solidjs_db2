function list_child_processes () {
    local ppid=$1;
    local current_children=$(pgrep -P $ppid);
    local local_child;
    if [ $? -eq 0 ];
    then
        for current_child in $current_children
        do
          local_child=$current_child;
          list_child_processes $local_child;
          echo $local_child;
        done;
    else
      return 0;
    fi;
}

ps 18432;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 18432 > /dev/null;
done;

for child in $(list_child_processes 18435);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/reynald/My-Programs/DotnetCore/core8_solidjs_db2/bin/Debug/net8.0/1c89fa4c4a8d405e8f98c5e90ade5aab.sh;
