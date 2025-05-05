import React from 'react';
import { View, Text, Image, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import CreatePollLayout from '../../components/createPollLayout';
import { ShareIcon, WhatsappIcon, MailIcon, ClockIcon } from '../../components/icons';
import { usePoll } from '../../components/pollContext';

export default function SharePoll() {
  const router = useRouter();
  const { state } = usePoll();

  const handleExit = () => {
    router.replace('/(tabs)');
  };

  const handleShare = () => {
    // Just a clickable button for now
    console.log('Share button clicked');
  };

  const handleWhatsappShare = async () => {
    try {
      const whatsappUrl = 'whatsapp://';
      const supported = await Linking.canOpenURL(whatsappUrl);
      if (supported) {
        await Linking.openURL(whatsappUrl);
      } else {
        console.log('WhatsApp is not installed');
      }
    } catch (error) {
      console.error('Error opening WhatsApp:', error);
    }
  };

  const handleEmailShare = async () => {
    try {
      await Linking.openURL('mailto:');
    } catch (error) {
      console.error('Error opening email app:', error);
    }
  };

  // Format date
  const formattedDate = state.endDate
    ? `${state.endDate.getDate()} de ${[
        'Enero','Febrero','Marzo','Abril','Mayo','Junio',
        'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
      ][state.endDate.getMonth()]} ${state.endDate.getFullYear()} ${state.endDate.getHours() % 12 || 12}:${state.endDate.getMinutes().toString().padStart(2, '0')} ${state.endDate.getHours() >= 12 ? 'PM' : 'AM'}`
    : 'No definida';

  return (
    <CreatePollLayout
      title="Ya quedó ¡Comparte tu votación!"
      onBack={() => router.replace('/(tabs)')}
      onNext={handleExit}
      nextLabel="Salir"
      progress={0}
      hideBackButton={true}
      showProgressBar={false}
    >
      <View style={styles.container}>
        {/* Banner de imagen */}
        <Image
          source={state.image ? { uri: state.image } : { uri: 'https://via.placeholder.com/400x150' }}
          style={styles.banner}
        />

        {/* Pregunta de la votación */}
        <Text style={styles.question}>{state.title || 'Sin título'}</Text>

        {/* Fecha y hora */}
        <View style={styles.infoRow}>
          <ClockIcon 
            size={28}           
            color="#555"        
            style={styles.icon} 
          />
          <Text style={styles.infoText}>{formattedDate}</Text>
        </View>

        {/* Share buttons */}
        <View style={styles.shareRow}>
          <TouchableOpacity onPress={handleShare}>
            <ShareIcon size={28} color="#555" style={styles.shareIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleWhatsappShare}>
            <WhatsappIcon size={28} color="#555" style={styles.shareIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleEmailShare}>
            <MailIcon size={28} color="#555" style={styles.shareIcon} />
          </TouchableOpacity>
        </View>
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
    marginBottom: 8,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    marginRight: 8,
    fontSize: 16,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
  },
  shareRow: {
    flexDirection: 'row',
    width: '60%',
    marginBottom: 30,
  },
  shareIcon: {
    marginHorizontal: 10,
  },
});
