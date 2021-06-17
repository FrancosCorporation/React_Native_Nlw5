import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import colors from '../styles/colors';
import { Header } from '../components/Header';
import fonts from '../styles/fonts';
import { EnviromentButton } from '../components/EnviromentButton';
import { api } from '../services/api';
import { PlantcardPrimary } from '../components/PlantcardPrimary';
import { Load } from '../components/Load';
import { useNavigation } from '@react-navigation/core';
import { PlantsProps } from '../libs/storage';

interface EnviromentProps {
    key: string;
    title: string;
}

export function PlantSelect() {
    const navigation = useNavigation();
    const [enviromentsSelected, setEnviromentsSelected] = useState('all');
    const [enviroments, setEnvirorments] = useState<EnviromentProps[]>([]);
    const [plants, setPlants] = useState<PlantsProps[]>([]);
    const [filteredPlants, setFilteredPlants] = useState<PlantsProps[]>([]);
    const [loading, setLoading] = useState(true);


    const [page, setPage] = useState(1);
    const [loadingMore, setloadingMore] = useState(false);
    function handleEnviromentSelect(environment: string) {
        setEnviromentsSelected(environment);
        if (environment === 'all')
            return setFilteredPlants(plants);

        const filtered = plants.filter(plant =>
            plant.environments.includes(environment)
        )
        setFilteredPlants(filtered);
    }

    async function fetchPlants() {
        const { data } = await api.get(`plants?_sort=name&order=asc&_page=${page}&_limit=10`);
        if (!data)
            return setLoading(true);
        if (page > 1) {
            setPlants(oldValue => [...oldValue, ...data])
            setFilteredPlants(oldValue => [...oldValue, ...data])
        }
        else {
            setPlants(data);
            setFilteredPlants(data);
        }

        setLoading(false);
        setloadingMore(false);
    }
    function handleFetchMore(distance: number) {
        if (distance < 1)
            return;

        setloadingMore(true);
        setPage(oldValue => oldValue + 1);
        fetchPlants();

    }
    function handlePlantSelect(plant: PlantsProps) {
        navigation.navigate('PlantSave', { plant });
    }

    useEffect(() => {
        async function fetchEnviroment() {
            const { data } = await api.get('plants_environments?_sort=title&order=asc');
            setEnvirorments([
                {
                    key: 'all',
                    title: 'Todos'
                },
                ...data

            ]);
        }
        fetchEnviroment();
    }, []);

    useEffect(() => {
        fetchPlants();
    }, []);

    if (loading) return <Load />
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header />
                <Text style={styles.title}>
                    Em Qual Ambiente
                </Text>
                <Text style={styles.subtitle}>
                    Você quer colocar Sua Planta?
                </Text>
            </View>
            <View>
                <FlatList
                    data={enviroments}
                    keyExtractor={(item) => String(item.key)}
                    renderItem={({ item }) => (
                        <EnviromentButton
                            title={item.title}
                            active={item.key === enviromentsSelected}
                            onPress={() => handleEnviromentSelect(item.key)}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.enviromentList}
                />
            </View>
            <View style={styles.plants}>
                <FlatList
                    data={filteredPlants}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <PlantcardPrimary
                            data={item}
                            onPress={() => handlePlantSelect(item)}
                        />
                    )}
                    onEndReachedThreshold={0.1}
                    onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    ListFooterComponent={loadingMore ? <ActivityIndicator color={colors.green} /> : <></>}
                />

            </View>


        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop: 15,
        lineHeight: 20
    },
    subtitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading

    },
    header: {
        padding: 30,
    },
    enviromentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 10,
        paddingRight: 10,
        width: Dimensions.get('window').width * 1.2
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'
    }
})