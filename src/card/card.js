import React from 'react';
import styles from './card.module.css';

const monthNames = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
];

const weekDayNames = [
    'пн',
    'вт',
    'ср',
    'чт',
    'пт',
    'сб',
    'вс',
];

function getTime(date) {
    const d = new Date(date);
    return d.toLocaleTimeString().slice(0, -3);
}

function getDate(date) {
    const d = new Date(date);
    const day = (d.getDate() / 10 | 0) + '' + d.getDate() % 10;
    const month = monthNames[d.getMonth()];
    const weekDay = weekDayNames[d.getDay()];
    return `${day} ${month} ${weekDay}`;
}

function Card({flight}) {
    const {price, airlineAlliance, legs, carrier} = flight;
    const from = legs[0].segments[0];
    const to = legs[0].segments[legs[0].segments.length - 1];
    const {duration} = legs[0];
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <span className={styles.carrier}>{airlineAlliance ? airlineAlliance.caption : carrier.caption}</span>
                <div className={styles['price-block']}>
                    <span className={styles['price-cost']}>{price.total.amount} {price.total.currencyCode}</span>
                    <span className={styles['price-disclaimer']}>Стоимость для одного взрослого пассажира</span>
                </div>
            </div>
            <div className={styles['flight-details']}>
                <div className={styles.pass}>
                    <span>{from.departureCity.caption}, {from.departureAirport.caption}</span>
                    <span className={styles["airports-acronym"]}> ({from.departureAirport.uid})</span>
                    <span> -> </span>
                    <span>{to.arrivalCity.caption}, {to.arrivalAirport.caption}</span>
                    <span className={styles["airports-acronym"]}> ({to.arrivalAirport.uid})</span>
                </div>
                <div className={styles.schedule}>
                    <div>
                        <span>{getTime(from.departureDate)}</span>
                        <span className={styles.date}> {getDate(from.departureDate)}</span>
                    </div>
                    <span className={styles.duration}>{duration / 60 | 0}ч {duration % 60}мин</span>
                    <div>
                        <span className={styles.date}>{getDate(to.arrivalDate)} </span>
                        <span>{getTime(to.arrivalDate)}</span>
                    </div>
                </div>
                <span className={styles['company-name']}>Рейс выполняет: {carrier.caption}</span>
            </div>
            <div className={styles['footer']}>
                <span className={styles.choice}>ВЫБРАТЬ</span>
            </div>
        </div>
    );
}

export default Card;
