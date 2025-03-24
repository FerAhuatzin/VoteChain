import Foundation from '@expo/vector-icons/Foundation';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

// Example: Provide defaults, but allow overrides via props
export const HomeIcon = ({ size = 24, color = 'black', ...rest }) => (
  <Foundation name="home" size={size} color={color} {...rest} />
);

export const MyVotesIcon = ({ size = 24, color = 'black', ...rest }) => (
  <FontAwesome6 name="chart-simple" size={size} color={color} {...rest} />
);

export const CreateIcon = ({ size = 24, color = 'black', ...rest }) => (
  <Ionicons name="add-circle" size={size} color={color} {...rest} />
);

export const ProfileIcon = ({ size = 24, color = 'black', ...rest }) => (
  <MaterialIcons name="account-circle" size={size} color={color} {...rest} />
);

export const SearchIcon = ({ size = 24, color = 'black', ...rest }) => (
  <AntDesign name="search1" size={size} color={color} {...rest} />
);

export const PopularIcon = ({ size = 24, color = 'black', ...rest }) => (
  <Ionicons name="flame" size={size} color={color} {...rest} />
);

export const SportsIcon = ({ size = 24, color = 'black', ...rest }) => (
  <MaterialIcons name="sports-soccer" size={size} color={color} {...rest} />
);

export const PoliticsIcon = ({ size = 24, color = 'black', ...rest }) => (
  <MaterialIcons name="how-to-vote" size={size} color={color} {...rest} />
);

export const TechnologyIcon = ({ size = 24, color = 'black', ...rest }) => (
  <MaterialIcons name="devices" size={size} color={color} {...rest} />
);

export const CinemaIcon = ({ size = 24, color = 'black', ...rest }) => (
  <MaterialCommunityIcons name="movie-roll" size={size} color={color} {...rest} />
);

export const EconomyIcon = ({ size = 24, color = 'black', ...rest }) => (
  <FontAwesome5 name="coins" size={size} color={color} {...rest} />
);

export const ClockIcon = (props) => (
    <AntDesign name="clockcircle" {...props} />
)

export const BackIcon = (props) => (
    <Ionicons name="arrow-back" {...props}/>
)

export const HeartIcon = (props) => (
    <AntDesign name="heart" {...props} />
)

export const HeartOutlinedIcon = (props) => (
    <FontAwesome name="heart-o" {...props} />
)

export const ShareIcon = (props) => (
    <AntDesign name="sharealt" {...props} />
)

export const CircleIcon = (props) => (
    <FontAwesome name="circle" {...props} />
)

export const MusicIcon = ({ size = 24, color = 'black', ...rest }) => (
    <Ionicons name="musical-notes-sharp" size={size} color={color} {...rest}/>
);

export const NatureIcon = ({ size = 24, color = 'black', ...rest }) => (
    <MaterialCommunityIcons name="leaf" size={size} color={color} {...rest}/>
);

export const NextIcon = (props) => (
    <MaterialIcons name="navigate-next" {...props}/>
)