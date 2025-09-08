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

ps 93447;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 93447 > /dev/null;
done;

for child in $(list_child_processes 93709);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/reynald/My-Programs/DotnetCore/core8_solidjs_db2/bin/Debug/net8.0/606dedc9c81d4a2ab15f6934f920054b.sh;
