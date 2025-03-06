import Foundation from '@expo/vector-icons/Foundation';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export const HomeIcon = (props) => (
    <Foundation name="home" {...props}/>
)

export const MyVotesIcon = (props) => (
    <FontAwesome6 name="chart-simple" {...props} />
)

export const CreateIcon = (props) => (
    <Ionicons name="add-circle" {...props} />
)

export const ProfileIcon = (props) => (
    <MaterialIcons name="account-circle" {...props} />
)