import {View} from 'react-native'
import { EditBody } from '../../components/editProfileBody';
import { userExample } from '../../example-data/polls-example';
import React from 'react';
import { EditHeader } from '../../components/editProfileHeader';
import { Stack } from 'expo-router';

export default function Edit(){
    return (
        <View style= { { flex: 1, backgroundColor: "white" }}>
            <Stack.Screen options={{ header: () => <EditHeader/> }} />
            <EditBody user={userExample}/>
        </View>
    );
}