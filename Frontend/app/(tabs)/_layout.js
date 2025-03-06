import {Tabs} from 'expo-router';
import {View} from 'react-native';
import {HomeIcon, MyVotesIcon, CreateIcon, ProfileIcon} from "../../components/icons";

export default function TabsLayout(){
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
            <Tabs.Screen
            name="index"
            options={{
                title: 'Inicio',
                tabBarIcon: ({color}) => <HomeIcon size={24} color={color}/>,
            }}/>
            <Tabs.Screen
            name="my-votes"
            options={{
                title: 'Mis votaciones',
                tabBarIcon: ({color}) => <MyVotesIcon size={24} color={color}/>,
            }}/>
            <Tabs.Screen
            name="create"
            options={{
                title: 'Crear',
                tabBarIcon: ({color}) => <CreateIcon size={24} color={color}/>,
            }}/>
            <Tabs.Screen
            name="profile"
            options={{
                title: 'Perfil',
                tabBarIcon: ({color}) => <ProfileIcon size={24} color={color}/>,
            }}/>
        </Tabs>
    );
}