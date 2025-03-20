import {Tabs, Link} from 'expo-router';
import {View, Pressable} from 'react-native';
import {HomeIcon, MyVotesIcon, CreateIcon, ProfileIcon} from "../../components/icons";
import {colors} from "../../styles/colors";

export default function TabsLayout(){
    return (
        <Tabs screenOptions={{tabBarActiveTintColor: colors.primary,}}>
            <Tabs.Screen
            name="index"
            options={{
                title: 'Inicio',
                tabBarIcon: ({color}) => <HomeIcon size={30} color={color}/>,
            }}/>
            <Tabs.Screen
            name="my-votes"
            options={{
                title: 'Mis votaciones',
                tabBarIcon: ({color}) => <MyVotesIcon size={30} color={color}/>,
            }}/>
             <Tabs.Screen
            name="create"
            options={{
                title: 'Crear',
                tabBarIcon: ({color}) => <CreateIcon size={30} color={color}/>,
            }}/>
            
            <Tabs.Screen
            name="profile"
            options={{
                title: 'Perfil',
                tabBarIcon: ({color}) => <ProfileIcon size={30} color={color}/>,
            }}/>
        </Tabs>
    );
}