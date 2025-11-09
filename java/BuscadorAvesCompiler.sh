#!/bin/bash

# Compila
echo " * Compilando el .java "
javac -cp .:json-20250517.jar BuscadorAvesAPI.java

# Ejecuta
echo " * Ejecutando el Buscador "
java -cp .:json-20250517.jar BuscadorAvesAPI


exit 0