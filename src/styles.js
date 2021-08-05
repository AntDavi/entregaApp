import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#242F3E',
      justifyContent: 'center',
    },
    map: {
        height: '70%',
    },
    search: {
        height: '30%',
        backgroundColor: '#242F3E',
        borderTopWidth: 0.5,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 8
    },
});

export {styles}