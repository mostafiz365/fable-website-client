import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


export const BOOK_PRICE_ID = {
    'Sapiens' : 'price_1TkJicLBevfC34C6RPnySv9y',
    'The Psychology of Money' : 'price_1TkLSdLBevfC34C69SL8QLzb',
    'Ikigai' : 'price_1TkLT1LBevfC34C6bNVe7BnX',
    '1984' : 'price_1TkLTTLBevfC34C6yG9WO05W',
    'To Kill a Mockingbird' : 'price_1TkLU0LBevfC34C6NAot3myy',
    'Start With Why' : 'price_1TkMQ6LBevfC34C6ceB1XPcB',
    'Cant Hurt Me' : 'price_1TkMQWLBevfC34C6fgmx4DRy',
    'The Pragmatic Programmer' : 'price_1TkMQsLBevfC34C6ZqCUXNMH',
    'You Dont Know JS Yet' : 'price_1TkMRGLBevfC34C6fzRyaWUt',
    'Eloquent JavaScript' : 'price_1TkMayLBevfC34C6IuI6PlG0',
    'Clean Code' : 'price_1TkMbcLBevfC34C6PDUKDMqu',
    'Zero to One' : 'price_1TkMc9LBevfC34C6tfoZOeHw',
    'The Lean Startup' : 'price_1TkMcaLBevfC34C6HtwLBntF',
    'The 7 Habits of Highly Effective People' : 'price_1TkMfmLBevfC34C6EzPxpr3C',
    'The Power of Now' : 'price_1TkMg4LBevfC34C6SkFoCR71',
    'The Catcher in the Rye' : 'price_1TkMh6LBevfC34C6apTWrYPz',
    'Atomic Habits' : 'price_1TkMhbLBevfC34C6PoEtPJtb',
    'The Alchemist' : 'price_1TkMhtLBevfC34C66ICT43ce',
    'Rich Dad Poor Dad' : 'price_1TkNSGLBevfC34C670Cur66a',
    'Deep Work' : 'price_1TkNSbLBevfC34C6Ijs7pGPu',
    'Think and Grow Rich' : 'price_1TkNT5LBevfC34C6hsjWb20l',
    'Harry Potter and the Sorcerers Stone' : 'price_1TkNTNLBevfC34C656DLnZ4N'
}