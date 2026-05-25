export const GUESTS = [
  { id: 1, name: 'Hildegard Meier', age: 82, pg: 3, days: ['Mo','Di','Mi'], address: 'Hauptstr. 12, 47803 Krefeld', pickup: '08:15', dropoff: '16:30', diet: 'Weichkost', notes: 'Rollstuhl, linksseitig', color: 'av-purple', initials: 'HM' },
  { id: 2, name: 'Werner Schulz', age: 76, pg: 2, days: ['Di','Do','Fr'], address: 'Gartenweg 5, 47809 Krefeld', pickup: '08:30', dropoff: '16:15', diet: 'Normal', notes: 'Hörgerät links', color: 'av-teal', initials: 'WS' },
  { id: 3, name: 'Erna Hoffmann', age: 89, pg: 4, days: ['Mo','Mi','Fr'], address: 'Am Bach 3, 47798 Krefeld', pickup: '08:00', dropoff: '16:45', diet: 'Diabetiker', notes: 'Demenziell verändert, Sitzgurt', color: 'av-amber', initials: 'EH' },
  { id: 4, name: 'Hans-Georg Braun', age: 79, pg: 2, days: ['Mo','Di','Mi','Do','Fr'], address: 'Schillerstr. 7, 47800 Krefeld', pickup: '08:45', dropoff: '16:00', diet: 'Normal', notes: '', color: 'av-green', initials: 'HB' },
  { id: 5, name: 'Lieselotte Fischer', age: 84, pg: 3, days: ['Mo','Do'], address: 'Lindenallee 21, 47805 Krefeld', pickup: '08:20', dropoff: '16:30', diet: 'Püriert', notes: 'Rollator, Sturzrisiko hoch', color: 'av-purple', initials: 'LF' },
  { id: 6, name: 'Fritz Müller', age: 77, pg: 2, days: ['Di','Fr'], address: 'Kirchplatz 4, 47802 Krefeld', pickup: '09:00', dropoff: '15:45', diet: 'Normal', notes: 'Blutdruck morgens messen', color: 'av-teal', initials: 'FM' },
  { id: 7, name: 'Margarete Wagner', age: 91, pg: 5, days: ['Mi','Fr'], address: 'Birkenweg 9, 47804 Krefeld', pickup: '08:10', dropoff: '17:00', diet: 'Sonderkost', notes: 'Intensivbetreuung, Rollstuhl elektr.', color: 'av-amber', initials: 'MW' },
]

export const TODAY_GUESTS = GUESTS.filter(g => g.days.includes('Mo'))

export const ROUTE = [
  { order: 1, guest: GUESTS[0], type: 'pickup', time: '08:00' },
  { order: 2, guest: GUESTS[4], type: 'pickup', time: '08:20' },
  { order: 3, guest: GUESTS[1], type: 'pickup', time: '08:30' },
  { order: 4, guest: GUESTS[3], type: 'pickup', time: '08:45' },
  { order: 5, guest: GUESTS[0], type: 'dropoff', time: '16:30' },
  { order: 6, guest: GUESTS[4], type: 'dropoff', time: '16:30' },
  { order: 7, guest: GUESTS[1], type: 'dropoff', time: '16:15' },
  { order: 8, guest: GUESTS[3], type: 'dropoff', time: '16:00' },
]

export const ABRECHNUNG_DATA = [
  { month: 'Jan', komda: 4200, einsparung: 1800, foerderung: 1200 },
  { month: 'Feb', komda: 4800, einsparung: 2100, foerderung: 1200 },
  { month: 'Mär', komda: 5100, einsparung: 2400, foerderung: 1200 },
  { month: 'Apr', komda: 5200, einsparung: 2600, foerderung: 1200 },
  { month: 'Mai', komda: 5600, einsparung: 2900, foerderung: 1200 },
  { month: 'Jun', komda: 5800, einsparung: 3100, foerderung: 1200 },
]

export const PG_TAGESSAETZE = { 2: 62, 3: 74, 4: 84, 5: 95 }
export const PG_ENTLASTUNG = { 2: 125, 3: 125, 4: 125, 5: 125 }
