import { Notyf } from 'notyf';
import React from 'react';
import 'notyf/notyf.min.css';

export const Notif_sucess_expense = () => {
  const notyf = new Notyf();
  notyf.success({
    message: 'Nouvelle Dépense créé',
    duration: 3000,
    icon: false,
  });
};

export const Notif_sucess_event = () => {
  const notyf = new Notyf();
  notyf.success({
    message: 'Votre évenement à été ajouté au calendrier',
    duration: 3000,
    icon: false,
  });
};

export const Notif_error_expense = () => {
  const notyf = new Notyf();
  notyf.error({
    message: 'Une erreur à été détectée..',
    duration: 3000,
    icon: false,
  });
};

export const Notif_error_calendar = () => {
  const notyf = new Notyf();
  notyf.error({
    message: "nous n'avons pas pu sauvegarder votre événement",
    duration: 3000,
    icon: false,
  });
};
