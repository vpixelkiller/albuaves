import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.*;
import org.json.JSONArray;
import org.json.JSONObject;

public class SearchBirdsAPI {

    public static void main(String[] args) throws URISyntaxException {
        try {
            // URL de la API (GET todas las aves)
            String apiUrl = "http://127.0.0.1:9191/api.php";
            // Updated to Java 20
        

            // Realizar la petición GET
            String response = sendGETPetition(apiUrl);

            // Mostrar la respuesta
            System.out.println("Response from API:");
            System.out.println(response);
            printJSONLint(response);

        } catch (IOException e) {
            System.err.println("Error connecting with API: " + e.getMessage());
        }
    }

    private static String sendGETPetition(String url) throws IOException, URISyntaxException {
        HttpURLConnection conexion = null;
        BufferedReader reader = null;
        StringBuilder respuesta = new StringBuilder();

        try {
            // Crear la conexión
            URL apiURL = new URI(url).toURL();
            conexion = (HttpURLConnection) apiURL.openConnection();
            conexion.setRequestMethod("GET");
            conexion.setRequestProperty("Accept", "application/json");

            // Verificar el código de respuesta
            int codigoRespuesta = conexion.getResponseCode();
            if (codigoRespuesta != HttpURLConnection.HTTP_OK) {
                throw new IOException("Error HTTP: " + codigoRespuesta);
            }

            // Leer la respuesta
            reader = new BufferedReader(new InputStreamReader(conexion.getInputStream()));
            String linea;
            while ((linea = reader.readLine()) != null) {
                respuesta.append(linea);
            }

        } finally {
            // Cerrar recursos
            if (reader != null) {
                reader.close();
            }
            if (conexion != null) {
                conexion.disconnect();
            }
        }

        return respuesta.toString();
    }
    
    
private static void printJSONLint(String json) {
        try {
            // Si la respuesta es un array de aves
            JSONArray birdsArray = new JSONArray(json);
            System.out.println("🌿 Lista de aves en la Albufera 🌿\n");
            System.out.println("+----+----------------+---------------------+----------------+-----------------------+");
            System.out.println("| ID |    Nombre      |      Cientifico       |   Descripción    | Img    |");
            System.out.println("+----+----------------+---------------------+----------------+-----------------------+");

            for (int i = 0; i < birdsArray.length(); i++) {
                JSONObject bird = birdsArray.getJSONObject(i);
                System.out.printf(
                    "| %2d | %-14s | %-19s | %-14s | %-21s |\n",
                    bird.getInt("bird_id"),
                    bird.getString("common_name"),
                    bird.getString("scientific_name"),
                    bird.getString("description"),
                    bird.getString("img_url")
                );
            }

            System.out.println("+----+----------------+---------------------+----------------+-----------------------+");
        } catch (Exception e) {
            // Si la respuesta es un solo objeto (por ejemplo, al buscar por ID)
            
            JSONObject bird = new JSONObject(json);
            System.out.println("\n📜 Detalle del ave 📜");
            System.out.println("ID: " + bird.getInt("bird_id"));
            System.out.println("Nombre: " + bird.getString("common_name"));
            System.out.println("Científico: " + bird.getString("scientific_name"));
            System.out.println("Descripción: " + bird.getString("description"));
            System.out.println("Imagen: " + bird.getString("img_url"));
            
        }
    }
}