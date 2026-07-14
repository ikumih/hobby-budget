import React, { useState } from 'react';
import { Text, View, TextInput, Button, FlatList, StyleSheet } from 'react-native';

export default function App() {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [dataList, setDataList] = useState([]);

  // 合計を計算
  const total = dataList.reduce((sum, item) => sum + Number(item.amount), 0);

  // 追加ボタン押したとき
  const addItem = () => {
    if (category && amount && date) {
      setDataList([...dataList, { id: Date.now().toString(), category, amount, date }]);
      setCategory('');
      setAmount('');
      setDate('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="カテゴリ"
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        style={styles.input}
        placeholder="金額"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="日付"
        value={date}
        onChangeText={setDate}
      />
      <Button title="追加" onPress={addItem} />
      <Text style={styles.total}>合計: {total} 円</Text>
      <FlatList
        data={dataList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>{item.date} - {item.category}: {item.amount} 円</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 50 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10 },
  total: { fontSize: 20, marginVertical: 10 },
});
