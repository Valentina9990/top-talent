import { Heading, Text, Hr, Link } from '@react-email/components';
import * as React from 'react';
import { EmailLayout } from '../components/EmailLayout';
import { baseStyles } from '../styles/shared';

interface PlayerContactEmailProps {
  playerName: string;
  scoutName: string;
  message: string;
  contactMethodLabel: string;
  contactValue: string;
  scoutProfileUrl: string;
}

export const PlayerContactEmail = ({
  playerName,
  scoutName,
  message,
  contactMethodLabel,
  contactValue,
  scoutProfileUrl,
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

      <Hr style={baseStyles.divider} />

      <Text style={baseStyles.paragraph}>
        También puedes conocer más sobre el scout visitando su perfil en TopTalent:
      </Text>
      <Text style={baseStyles.paragraph}>
        <Link href={scoutProfileUrl} style={baseStyles.link}>
          Ver perfil del scout
        </Link>
      </Text>
    </EmailLayout>
  );
};

export default PlayerContactEmail;
