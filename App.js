import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Timer } from './Timer'

export default function App() {
  return (
    <View style={styles.container}>
      <Timer
        totalTimeOnSeconds={60 * 25}
        size={512}
        borderSize={5}
        borderColor="#F5F5F5"
        borderColorHover="#555"
        backgroundColor="white"
        fontStyle={{ fontSize: 52, color: "#666666" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
