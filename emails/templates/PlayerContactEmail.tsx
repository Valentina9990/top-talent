import { Heading, Text, Hr } from '@react-email/components';
import * as React from 'react';
import { EmailLayout } from '../components/EmailLayout';
import { baseStyles } from '../styles/shared';

interface PlayerContactEmailProps {
  playerName: string;
  scoutName: string;
  message: string;
  contactMethodLabel: string;
  contactValue: string;
}

export const PlayerContactEmail = ({
  playerName,
  scoutName,
  message,
  contactMethodLabel,
  contactValue,
}: PlayerContactEmailProps) => {
  return (
    <EmailLayout preview="Has recibido un mensaje de un scout">
      <Heading style={baseStyles.heading}>
        Tienes un nuevo mensaje de un scout
      </Heading>

      <Text style={baseStyles.paragraph}>
        Hola {playerName},
      </Text>

      <Text style={baseStyles.paragraph}>
        Has recibido un mensaje de <strong>{scoutName}</strong> a través de TopTalent.
      </Text>

      <Text style={baseStyles.paragraph}>
        <strong>Mensaje:</strong>
      </Text>
      <Text style={baseStyles.paragraph}>
        {message}
      </Text>

      <Hr style={baseStyles.divider} />

      <Text style={baseStyles.paragraph}>
        <strong>Datos de contacto del scout:</strong>
      </Text>
      <Text style={baseStyles.paragraph}>
        {contactMethodLabel}: {contactValue}
      </Text>

      <Text style={baseStyles.paragraph}>
        Te recomendamos responder directamente al scout utilizando el método de
        contacto indicado.
      </Text>
    </EmailLayout>
  );
};

export default PlayerContactEmail;
