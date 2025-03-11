import Foundation from '@expo/vector-icons/Foundation';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

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

export const SearchIcon = (props) => (
    <AntDesign name="search1" {...props} />
)

export const PopularIcon = (props) => (
    <Ionicons name="flame" {...props} />
)

export const SportsIcon = (props) => (
    <MaterialIcons name="sports-soccer" size={24} color="black" />
)

export const PoliticsIcon = (props) => (
    <MaterialIcons name="how-to-vote" {...props} />
)

export const TechnologyIcon = (props) => (
    <MaterialIcons name="devices" {...props} />
)

export const CinemaIcon = (props) => (
    <MaterialCommunityIcons name="movie-roll" {...props} />
)

export const EconomyIcon = (props) => (
    <FontAwesome5 name="coins" {...props} />
)

export const ClockIcon = (props) => (
    <AntDesign name="clockcircle" {...props} />
)