import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { CloseIcon } from './icons';
import { colors } from "../styles/colors";

interface Props {
  title: string;
  children: React.ReactNode;
  progress?: number;          
  onBack: () => void;
  onNext: () => void;
  nextLabel?: string;
  backLabel?: string;
  hideBackButton?: boolean;
  showProgressBar?: boolean;
  isNextEnabled?: boolean;
}

export default function CreatePollLayout({
  title,
  children,
  progress = 0,
  onBack,
  onNext,
  nextLabel = "Siguiente",
  backLabel = "Atrás",
  hideBackButton = false,
  showProgressBar = true,
  isNextEnabled = true,
}) {
  const router = useRouter();

  const handleCancel = () => {
    // Cancel button goes to feed regardless of history
    router.replace("/(tabs)");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel}>
          <CloseIcon size={30} color="gray" />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>

     
      {/* Step content */}
      <View style={styles.content}>{children}</View>

       {/* Progress Bar */}
       {showProgressBar && (
         <View style={styles.progressContainer}>
           <View
             style={[
               styles.progressFill,
               { width: `${Math.min(Math.max(progress, 0), 1) * 100}%` },
             ]}
           />
         </View>
       )}

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.buttons}>
          {hideBackButton ? (
              <View style = {[styles.backButton, {opacity: 0}]}>
                <Text style = {styles.backText}>{backLabel}</Text>
              </View>
          ) : (
              <TouchableOpacity onPress={onBack} style={styles.backButton}>
              <Text style={styles.backText}>{backLabel}</Text>
            </TouchableOpacity>
          ) }
          <TouchableOpacity 
            onPress={onNext} 
            style={[
              styles.nextButton,
              !isNextEnabled && styles.nextButtonDisabled
            ]}
            disabled={!isNextEnabled}
          >
            <Text style={styles.nextText}>{nextLabel}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  
  header: { flexDirection: 'column', alignItems: 'flex-start', marginBottom: 10 },
  
  title: { fontSize: 25, fontWeight: '600', marginTop:12 },
  
  content: { flex: 1 },
  
  progressContainer: {
    height: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    overflow: 'hidden',
    borderColor:"gray",
    borderWidth: 1,
  },
  progressFill: {
    height: '100%',
    backgroundColor: "black",
  },
  
  footer: { marginTop: 16 },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  backButton: {
    backgroundColor: '#e5e5e5',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
  },
  nextButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
  },
  nextButtonDisabled: {
    backgroundColor: '#cccccc',
  },
  backText: { color: '#000', fontWeight: '600' },
  nextText: { color: 'white', fontWeight: '600' },
});