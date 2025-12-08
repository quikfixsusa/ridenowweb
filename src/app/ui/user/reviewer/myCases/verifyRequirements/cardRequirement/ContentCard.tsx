import { DriverRequirementType } from '@/app/lib/types/reviewsTypes';
import { RequirementStatus } from '@/app/lib/types/userTypes';
import Link from 'next/link';

import Buttons from './Buttons';
import ButtonsVehicle from './ButtonsVehicle';

interface Props {
  verificationSteps: string;
  note: string;
  link: string;
  status: RequirementStatus;
  title: string;
  format: string;
  value?: string;
  vehicle?: boolean;
  driverId: string;
  reviewId: string;
  idReq: DriverRequirementType;
}

export default function ContentCard({
  verificationSteps,
  note,
  link,
  status,
  driverId,
  reviewId,
  title,
  value,
  vehicle,
  idReq,
}: Props) {
  function formatText(text: string) {
    return text.split('*').map((line, index) => (
      <p className="text-gray-600" key={index}>
        {line}
        <br />
      </p>
    ));
  }

  function parseStatus(status: RequirementStatus) {
    switch (status) {
      case 'in_review':
        return 'En revisión';
      case 'reception':
        return 'Recepción';
      case 'approved':
        return 'Aprovado';
      case 'edit':
        return 'Editar';
      default:
        return 'Recepción';
    }
  }

  function getMessageByStatus(status: RequirementStatus) {
    switch (status) {
      case 'in_review':
        return 'Este requerimiento ya ha sido enviado por el usuario, sigue los pasos y verificalo.';
      case 'reception':
        return 'Este requisito aún no ha sido enviado por el usuario.';
      case 'approved':
        return 'Este requisito ha sido aprobado.';
      case 'edit':
        return 'El usuario tiene que enviar el requisito de nuevo.';
      default:
        return 'Este requisito aún no ha sido enviado por el usuario.';
    }
  }
  return (
    <div className="mt-4 flex flex-col gap-4">
      <div>
        <p className="text-gray-600">
          <b>{parseStatus(status)}:</b> {getMessageByStatus(status)}
        </p>
      </div>
      {value && (
        <div>
          <p className="text-lg font-semibold">{title}</p>
          <p className="text-2xl font-bold text-black">{value}</p>
        </div>
      )}
      <div>
        <p className="text-lg font-semibold text-gray-600">Verification Steps:</p>
        <div>{formatText(verificationSteps)}</div>
      </div>
      {note && (
        <div>
          <p className="text-lg font-semibold text-gray-600">Edit Note:</p>
          <p className="text-sm text-red-600">{note}</p>
        </div>
      )}
      <div className="flex items-center justify-between gap-3">
        {link && (
          <Link className="text-lg font-medium text-blue-600 hover:underline" href={link} target="_blank">
            Ver documento adjunto
          </Link>
        )}
        {!vehicle && <Buttons status={status} driverId={driverId} reviewId={reviewId} idReq={idReq} />}
        {vehicle && <ButtonsVehicle status={status} driverId={driverId} reviewId={reviewId} idReq={idReq} />}
      </div>
    </div>
  );
}
