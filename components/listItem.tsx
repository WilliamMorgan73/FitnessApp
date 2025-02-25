import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

interface ListItemProps {
  imageSource: any;
  title: string;
  description: string;
  items: string[];
}

export function ListItem({ imageSource, title, description, items }: ListItemProps) {
    return (
        <View style={styles.card}>
            <View style={styles.container}>
                <Image source={imageSource} style={styles.image} />
                <View style={styles.content}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                    <View style={styles.itemList}>
                        <Text style={styles.itemText}>{items.join(', ')}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'transparent',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        margin: 5,
    },
    container: {
        flexDirection: 'row',
        padding: 10,
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    content: {
        flex: 1,
    },
    title: {
        color: 'gray',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    itemList: {
        marginTop: 5,
    },
    itemText: {
        color: 'gray',
    },
    description: {
        color: 'gray',
    },
});
