import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";
import * as Notifications from 'expo-notifications'
import Constants from 'expo-constants';
import { Alert, Platform } from "react-native";

export interface PlantsProps {
    id: string;
    name: string;
    about: string;
    water_tips: string;
    photo: string;
    environments: [string];
    frequency: {
        times: number;
        repeat_every: string;
    };
    dateTimeNotification: Date;
    hour: string;
}

export interface StoragePlantProps {
    [id: string]: {
        data: PlantsProps;
        notificationId: string;
    }
}

export async function savePlant(plant: PlantsProps): Promise<void> {
    try {
        registerForPushNotificationsAsync();
        const nexTime = new Date(plant.dateTimeNotification);
        const now = new Date();
        const { times, repeat_every } = plant.frequency;


        if (repeat_every === 'week') {
            const interval = Math.trunc(7 / times);
            nexTime.setDate(now.getDate() + interval);
        }
        /* else 
            nexTime.setDate(nexTime.getDate() + 1); */

        const seconds = Math.abs(Math.ceil(now.getTime() - nexTime.getTime()) / 1000);
        const notificationId = await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Heeyyyy, 🎁',
                body: 'Esta na hora de Regar essa tal de: !! ' + plant.name,
                sound: true,
                priority: Notifications.AndroidNotificationPriority.HIGH,
                data: {
                    plant
                },
            },
            trigger: {
                seconds: seconds < 60 ? 60 : seconds,
                repeats: true
            }
        });
        console.log(seconds)
        const data = await AsyncStorage.getItem('@react_native_nlw5:plant');
        const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {};
        const newPlant = {
            [plant.id]: {
                data: plant,
                notificationId
            }
        }
        await AsyncStorage.setItem('@react_native_nlw5:plant',
            JSON.stringify({
                ...newPlant,
                ...oldPlants
            }));
    } catch (error: any) {
        throw new Error(error);

    }
}
export async function loadPlant(): Promise<PlantsProps[]> {
    try {
        const data = await AsyncStorage.getItem('@react_native_nlw5:plant');
        const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};

        const plantsSorted = Object
            .keys(plants)
            .map((plant) => {
                return {
                    ...plants[plant].data,
                    hour: format(new Date(plants[plant].data.dateTimeNotification), 'HH:mm',)
                }
            })
            .sort((a, b) => Math.floor(new Date(a.dateTimeNotification).getTime() / 1000 -
                Math.floor(new Date(b.dateTimeNotification).getTime() / 1000)))
        return plantsSorted;
    } catch (error: any) {
        throw new Error(error);

    }
}

export async function removePlant(id: string): Promise<void> {
    const data = await AsyncStorage.getItem('@react_native_nlw5:plant');
    const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};

    await Notifications.cancelScheduledNotificationAsync(plants[id].notificationId);

    delete plants[id];
    await AsyncStorage.setItem('@react_native_nlw5:plant', JSON.stringify(plants))

}

async function registerForPushNotificationsAsync() {
    try {
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: false,
                shouldSetBadge: false,
            }),
        });

        if (Constants.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Verifique nas configurações, suas notificações estão desligadas !');
                return;
            }
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }
    }
    catch (error) {
        console.log('error')
    }
}