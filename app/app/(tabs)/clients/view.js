import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import request from '../../services/requests';

export default function ClientDetail() {
  const { id } = useLocalSearchParams();
  const [client, setClient] = useState(null);
  const router = useRouter();

 useEffect(() => {
  if (id) {
    request.get(`/clients/search/phone?phone=${id}`)
      .then(res => {
        console.log('Cliente recibido:', res.data);
        setClient(res.data);
      })
      .catch(err => {
        console.error('Error al obtener cliente:', err);
      });
  }
}, [id]);

  const deleteClient = async () => {
    await request.delete(`/clients/delete/${client.id}`);
    Alert.alert('Cliente eliminado');
    router.push('/clients');
  };

  return (
    <View style={styles.container}>
    {client ? (
      <>
        <Text style={styles.title}>Nombre: {client.name}</Text>
        <Text style={styles.title}>Teléfono: {client.phone_number}</Text>
        <Text style={styles.title}>Dirección: {client.address}</Text>
        <Button title="Eliminar" onPress={deleteClient} />
        <Button title="Actualizar" onPress={() => router.push(`/clients/update?id=${client.phone_number}`)} />
        <Button title="Cancelar" onPress={() => router.push('/clients')} />
      </>
    ) : (
      <Text style={styles.title}>Cargando cliente...</Text>
    )}
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
