import React from "react";
import styles from './filters.module.css';
import {DURATION_ASC, PRICE_ASC, PRICE_DESC} from "./orders";

export default function Filters({order, ignoreTransfers, setPrice, setOrder, setTransferFilter, prices}) {
    return (
        <div className={styles.controls}>
            <p className={styles.title}>Сортировать</p>
            <p className={styles.option}>
                <input type='radio' checked={order === PRICE_ASC} onChange={()=>setOrder(PRICE_ASC)}/>
            - по возрастанию цены
            </p>
            <p className={styles.option}>
                <input type='radio' checked={order === PRICE_DESC} onChange={()=>setOrder(PRICE_DESC)}/>
            - по убыванию цены
            </p>
            <p className={styles.option}>
                <input type='radio'  checked={order === DURATION_ASC} onChange={()=>setOrder(DURATION_ASC)}/>
             - по времени в пути
            </p>
            <p className={styles.title}>Фильтровать</p>
            <p className={styles.option}>
                <input type='checkbox' checked={ignoreTransfers}  onChange={()=>setTransferFilter(!ignoreTransfers)}/>
                - без пересадок</p>
            <p className={styles.title}>Цена</p>
            <p className={styles.option}>
                От <input type='text' value={prices[0]} onChange={e => setPrice(e.target.value, 0)}/>
            </p>
            <p className={styles.option}>
                До <input type='text' value={prices[1]} onChange={e => setPrice(e.target.value, 1)}/>
            </p>
        </div>
    )
}