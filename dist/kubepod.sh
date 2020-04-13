#!/bin/sh
# For more information about shpod, check it out on GitHub:
# https://github.com/jpetazzo/shpod

namespace=$1
YAML=$2
echo "Creating Pod in $namespace"
# kubectl apply -f $YAML -n $namespace
cat <<EOF | kubectl apply -n $namespace -f -
$YAML
EOF
echo "Waiting for pod to be ready..."
kubectl wait --timeout=240s --namespace=$namespace --for condition=Ready pod/kubepod
echo "Attaching to the pod..."
kubectl -n namespace attach --namespace=$namespace -ti kubepod </dev/tty
echo "Deleting pod..."
echo "
Note: it's OK to press Ctrl-C if this takes too long and you're impatient.
Clean up will continue in the background. However, if you want to restart
shpod, you need to wait a bit (about 30 seconds).
"
cat <<EOF | kubectl delete  --now -n $namespace -f -
$YAML
EOF
