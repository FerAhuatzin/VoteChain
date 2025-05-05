import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import CreatePollLayout from '../../components/createPollLayout';
import { usePoll } from '../../components/pollContext';
import {
    SearchIcon,
    SportsIcon,
    PoliticsIcon,
    CinemaIcon,
    TechnologyIcon,
    EconomyIcon,
    MusicIcon,
    NatureIcon,
    ClockIcon,
    CheckIcon,
  } from '../../components/icons';

const categoryIconMap = {
  cine: CinemaIcon,
  deportes: SportsIcon,
  economia: EconomyIcon,
  tecnologia: TechnologyIcon,
  politica: PoliticsIcon,
  ambiente: NatureIcon,
  educacion: SearchIcon,
  musica: MusicIcon,
};

export default function Summary() {
  const router = useRouter();
  const { state } = usePoll();

  // Format date
  const formattedDate = state.endDate
    ? `${state.endDate.getDate()} de ${[
        'Enero','Febrero','Marzo','Abril','Mayo','Junio',
        'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
      ][state.endDate.getMonth()]} ${state.endDate.getFullYear()} ${state.endDate.getHours() % 12 || 12}:${state.endDate.getMinutes().toString().padStart(2, '0')} ${state.endDate.getHours() >= 12 ? 'PM' : 'AM'}`
    : 'No definida';

  // Preferences
  const visibility = state.preferences.isPublic ? 'Pública' : 'Privada';
  const creatorName = state.preferences.showCreatorName ? 'Nombre visible' : 'Nombre no visible';
  const stats = state.preferences.showStatsBeforeEnd ? 'Estadísticas visibles' : 'Estadísticas no visibles';

  return (
    <CreatePollLayout
      title="Revisa que todos los detalles se vean bien."
      onBack={() => router.back()}
      onNext={() => router.push('/(create-poll)/sharePoll')}
      nextLabel="Finalizar"
      progress={7/7}
    >
      <View style={styles.container}>
        {/* Image */}
        <Image
          source={state.image ? { uri: state.image } : { uri: 'https://via.placeholder.com/400x150' }}
          style={styles.banner}
        />

        {/* Title*/}
        <Text style={styles.question}>{state.title || 'Sin título'}</Text>

        {/* Date */}
        <View style={styles.infoRow}>
          <ClockIcon 
            size={16}           
            color="#555"        
            style={styles.icon} 
          />
          <Text style={styles.infoText}>{formattedDate}</Text>
        </View>

        {/* Preferences */}
        <View style={styles.checkList}>
          {[visibility, creatorName, stats].map(item => (
            <View key={item} style={styles.checkItem}>
              <CheckIcon 
                size={16}           
                color="#555"        
                style={styles.icon} 
              />
              <Text style={styles.checkText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Selected categories */}
        {state.categories && state.categories.length > 0 && (
          <View style={styles.infoRow}>
            {state.categories.map((cat) => {
              const IconComponent = categoryIconMap[cat];
              return IconComponent ? (
                <IconComponent
                  key={cat}
                  size={16}
                  color="#555"
                  style={styles.icon}
                />
              ) : null;
            })}
            <Text style={styles.infoText}>{state.categories.map(cat => {
              const found = Object.entries(categoryIconMap).find(([key]) => key === cat);
              return found ? found[0].charAt(0).toUpperCase() + found[0].slice(1) : cat;
            }).join(', ')}</Text>
          </View>
        )}
      </View>
    </CreatePollLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  banner: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#e0e0e0', 
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 8,
    fontSize: 16,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
  },
  checkList: {
    marginVertical: 10,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  checkIcon: {
    marginRight: 8,
    fontSize: 14,
  },
  checkText: {
    fontSize: 14,
    color: '#555',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#000',
    borderRadius: 3,
    marginTop: 20,
  },
});
