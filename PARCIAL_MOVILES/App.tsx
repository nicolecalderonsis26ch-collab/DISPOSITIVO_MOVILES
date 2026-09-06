import { useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';

type Producto = {
  id: string;
  nombre: string;
  precio: number;
};

const productos: Producto[] = [
  {
    id: '1',
    nombre: 'Camiseta',
    precio: 50,
  },
  {
    id: '2',
    nombre: 'Gorra',
    precio: 30,
  },
  {
    id: '3',
    nombre: 'Mochila',
    precio: 80,
  },
];

export default function App() {
  const [carrito, setCarrito] = useState<Producto[]>([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  const agregar = (producto: Producto) => {
    setCarrito([...carrito, producto]);
  };

  const eliminar = (id: string) => {
    const nuevoCarrito = carrito.filter(
      (producto) => producto.id !== id
    );

    setCarrito(nuevoCarrito);
  };

  const total = carrito.reduce(
    (suma, producto) => suma + producto.precio,
    0
  );

  const comprar = () => {
    if (carrito.length === 0) {
      Alert.alert(
        'Carrito vacío',
        'Agrega un producto antes de comprar.'
      );
      return;
    }

    Alert.alert(
      '¡Compra realizada!',
      `Total: Bs. ${total}`
    );

    setCarrito([]);
    setMostrarCarrito(false);
  };

  return (
    <View style={styles.container}>

      {/* ENCABEZADO */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>MiniShop</Text>
          <Text style={styles.subtitulo}>
            Compra fácil y rápido
          </Text>
        </View>

        <Pressable
          style={styles.carritoBoton}
          onPress={() => setMostrarCarrito(!mostrarCarrito)}
        >
          <Text style={styles.carritoTexto}>
            🛒 {carrito.length}
          </Text>
        </Pressable>
      </View>

      {/* CARRITO */}
      {mostrarCarrito ? (
        <View style={styles.seccion}>

          <Text style={styles.titulo}>
            🛒 Mi carrito
          </Text>

          {carrito.length === 0 ? (
            <Text style={styles.vacio}>
              Tu carrito está vacío
            </Text>
          ) : (
            <FlatList
              data={carrito}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.itemCarrito}>

                  <View>
                    <Text style={styles.nombre}>
                      {item.nombre}
                    </Text>

                    <Text style={styles.precio}>
                      Bs. {item.precio}
                    </Text>
                  </View>

                  <Pressable
                    style={styles.eliminar}
                    onPress={() => eliminar(item.id)}
                  >
                    <Text style={styles.botonTexto}>
                      Eliminar
                    </Text>
                  </Pressable>

                </View>
              )}
            />
          )}

          <Text style={styles.total}>
            Total: Bs. {total}
          </Text>

          <Pressable
            style={styles.comprar}
            onPress={comprar}
          >
            <Text style={styles.botonTexto}>
              Comprar
            </Text>
          </Pressable>

          <Pressable
            style={styles.volver}
            onPress={() => setMostrarCarrito(false)}
          >
            <Text style={styles.botonTexto}>
              Ver productos
            </Text>
          </Pressable>

        </View>
      ) : (

        /* PRODUCTOS */
        <View style={styles.seccion}>

          <Text style={styles.titulo}>
            🛍️ Productos
          </Text>

          <FlatList
            data={productos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.producto}>

                <View>
                  <Text style={styles.nombre}>
                    {item.nombre}
                  </Text>

                  <Text style={styles.precio}>
                    Bs. {item.precio}
                  </Text>
                </View>

                <Pressable
                  style={styles.agregar}
                  onPress={() => agregar(item)}
                >
                  <Text style={styles.botonTexto}>
                    + Agregar
                  </Text>
                </Pressable>

              </View>
            )}
          />

        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F8F3',
    padding: 20,
    paddingTop: 55,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },

  logo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#14532D',
  },

  subtitulo: {
    color: '#4B6B52',
    marginTop: 4,
  },

  carritoBoton: {
    backgroundColor: '#166534',
    padding: 12,
    borderRadius: 12,
  },

  carritoTexto: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

  seccion: {
    flex: 1,
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#14532D',
    marginBottom: 15,
  },

  producto: {
    backgroundColor: 'white',
    padding: 18,
    borderRadius: 14,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  itemCarrito: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 14,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  nombre: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#1F2937',
  },

  precio: {
    fontSize: 17,
    color: '#15803D',
    marginTop: 5,
    fontWeight: 'bold',
  },

  agregar: {
    backgroundColor: '#16A34A',
    padding: 10,
    borderRadius: 9,
  },

  eliminar: {
    backgroundColor: '#6B7280',
    padding: 9,
    borderRadius: 9,
  },

  comprar: {
    backgroundColor: '#14532D',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 15,
  },

  volver: {
    backgroundColor: '#16A34A',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },

  botonTexto: {
    color: 'white',
    fontWeight: 'bold',
  },

  total: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#14532D',
    marginTop: 15,
  },

  vacio: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: '#6B7280',
  },
});