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

ps 42916;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 42916 > /dev/null;
done;

for child in $(list_child_processes 42917);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/reynald/My-Programs/DotnetCore/core8_solidjs_db2/bin/Debug/net8.0/028d68b05e3f405c98ba20002ad2ae4e.sh;
