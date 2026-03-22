import { Heading, Text, Hr } from '@react-email/components';
import * as React from 'react';
import { EmailLayout } from '../components/EmailLayout';
import { baseStyles } from '../styles/shared';

interface ScoutContactConfirmationEmailProps {
  scoutName: string;
  playerName: string;
  message: string;
  contactMethodLabel: string;
  contactValue: string;
}

export const ScoutContactConfirmationEmail = ({
  scoutName,
  playerName,
  message,
  contactMethodLabel,
  contactValue,
}: ScoutContactConfirmationEmailProps) => {
  return (
    <EmailLayout preview="Tu mensaje ha sido enviado al jugador">
      <Heading style={baseStyles.heading}>
        Tu mensaje ha sido enviado
      </Heading>

      <Text style={baseStyles.paragraph}>
        Hola {scoutName},
      </Text>

      <Text style={baseStyles.paragraph}>
        Hemos enviado tu mensaje a <strong>{playerName}</strong> a través de TopTalent.
      </Text>

      <Text style={baseStyles.paragraph}>
        <strong>Mensaje enviado:</strong>
      </Text>
      <Text style={baseStyles.paragraph}>
        {message}
      </Text>

      <Hr style={baseStyles.divider} />

      <Text style={baseStyles.paragraph}>
        <strong>Método de contacto compartido con el jugador:</strong>
      </Text>
      <Text style={baseStyles.paragraph}>
        {contactMethodLabel}: {contactValue}
      </Text>

      <Text style={baseStyles.paragraph}>
        El jugador ahora tiene tu información de contacto y podrá
        comunicarse contigo directamente si está interesado.
      </Text>
    </EmailLayout>
  );
};

export default ScoutContactConfirmationEmail;
