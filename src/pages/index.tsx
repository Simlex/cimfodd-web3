import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '../styles/Home.module.scss'
import Perks from '@/components/Homepage/Perks'
import HeroSection from '@/components/Homepage/HeroSection'
import PizzaList from '@/components/Homepage/PizzaList'
import axios from 'axios'
import { useState, useEffect, FunctionComponent, ReactElement } from 'react'
import { error } from 'console'
import { Product } from '@/models/ProductResponse'

const inter = Inter({ subsets: ['latin'] })

interface HomeProps {
    products: Product[] | undefined
    isFetchingProducts: boolean
}

const Home: FunctionComponent<HomeProps> = ({ products, isFetchingProducts }): ReactElement => {
    return (
        <>
            <Head>
                <title>Home | Cimfodd</title>
                <meta name="description" content="Your number 1 decentralized food delivery application" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.homepage}>
                <HeroSection />
                <PizzaList pizzaList={products} isFetchingProducts={isFetchingProducts} />
                <Perks />
            </main>
        </>
    );
}

export default Home;