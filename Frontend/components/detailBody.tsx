import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import { colors } from "../styles/colors";
import { ClockIcon } from "./icons";
import { BarChart } from "react-native-chart-kit";
import { useRouter } from "expo-router";

interface props {
  poll: any;
  votes: any;
  user: any;
}

export const DetailBody = ({ poll, votes, user }: props) => {
  const router = useRouter();

  const opciones = votes?.opciones || [];

  const descripciones = opciones.map((opcion) => opcion.descripcion || "Sin nombre");
  const votos = opciones.map((opcion) => opcion.votos || 0);

  const totalVotos = votos.reduce((acc, val) => acc + val, 0);

  // DEBUG LOGS
  console.log("votes prop recibido:", votes);
  console.log("Opciones (descripciones):", descripciones);
  console.log("Votos por opción:", votos);
  console.log("Total de votos calculado:", totalVotos);

  const data = {
    labels: descripciones,
    datasets: [
      {
        data: votos,
      },
    ],
  };

  const handlePress = () => {
    if (!poll?.id) {
      console.warn("poll.id está vacío, no se puede navegar");
      return;
    }
    router.push(`/polls/execute/${poll.id}`);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{poll?.titulo || "Sin título"}</Text>
        <View style={styles.captions}>
          <ClockIcon size={14} />
          <Text style={{ paddingLeft: 5 }}>
            {poll?.fechaFin ? new Date(poll.fechaFin).toLocaleDateString() : "Sin fecha"}
          </Text>
        </View>
        <View style={styles.line} />
        <Text>{poll?.descripcion || "Sin descripción"}</Text>
        <View style={styles.line} />
        <View style={styles.profile}>
          <Image
            source={{ uri: user?.imagen || 'https://via.placeholder.com/50' }}
            style={styles.image}
          />
          <Text style={{ padding: 10 }}>Creador: {user?.nombre || "Desconocido"}</Text>
        </View>
        <View style={styles.line} />
        {opciones.length > 0 ? (
          <>
            <BarChart
              data={data}
              width={Dimensions.get("window").width - 20}
              height={300}
              yAxisLabel=""
              yAxisSuffix=""
              chartConfig={{
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(2, 119, 162, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                propsForBackgroundLines: {
                  strokeWidth: 1,
                  stroke: "#e0e0e0",
                },
              }}
              style={{ marginVertical: 10, paddingLeft: 10 }}
            />
            <Text style={{ textAlign: "center", marginVertical: 10 }}>
              Total de votos: {totalVotos}
            </Text>
          </>
        ) : (
          <Text style={{ textAlign: "center", marginVertical: 10 }}>
            Aún no hay votos registrados.
          </Text>
        )}
      </ScrollView>
      <View style={{ paddingVertical: 20 }}>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={{ color: "white", fontSize: 16 }}>Votar ahora</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
    marginTop: 10,
    flex: 1,
  },
  title: {
    fontSize: 25,
  },
  captions: {
    flexDirection: "row",
    marginTop: 5,
    opacity: 0.5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  line: {
    height: 1,
    backgroundColor: "black",
    marginVertical: 10,
    opacity: 0.3,
  },
  button: {
    width: "100%",
    height: 55,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
  },
});
