import { ajax } from 'jquery'
import axios, { type AxiosRequestConfig } from 'axios'
import type { RESTMethod, DefaultAJAXResponse, ContentType } from '../types'
import type { Program } from './programs'

// Create slug from the title
export const formatSlug = (input: string): string => {
    const date = new Date()
    const tokens = input.trim()
        .toLocaleLowerCase()
        .replace(/([^a-z0-9 ])/g, '')
        .replace(/ {2}/g, ' ')
        .trim()
        .split(' ')

    tokens.splice(8)
    tokens.push(
        date.getDate().toString(),
        (date.getMonth() + 1).toString(),
        date.getFullYear().toString()
    )

    return tokens.join('-')
}

export type OS = 'Mac OS' | 'Windows' | 'Linux' | 'Android' | 'iOS' | 'Other'

// Detect user OS
export const detectOS = (): OS => {
    const userAgent = window.navigator.userAgent,
        platform = window.navigator.platform,
        macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod']

    let os: OS = 'Other'

    if (macosPlatforms.indexOf(platform) !== -1) {
        os = 'Mac OS'
    } else if (iosPlatforms.indexOf(platform) !== -1) {
        os = 'iOS'
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = 'Windows'
    } else if (/Android/.test(userAgent)) {
        os = 'Android'
    } else if (/Linux/.test(platform)) {
        os = 'Linux'
    }

    return os
}

// Cut the long text into short version
export const cutPostText = (text: string): string => {
    const maxTextLength = 100
    const maxWordsLength = 30

    if (text.length < maxTextLength)
        return text

    const words: string[] = text.split(' ')
    words.splice(maxWordsLength)
    const result: string = words.join(' ')
    return result + '...'
}

// Create a plain JSON from FormData
export const transformFormData = (form: FormData): Record<string, unknown> => {
    const object: Record<string, unknown> = {}
    form.forEach((value, key) => object[key] = value)
    return object
}

interface AJAXOptions {
    method: RESTMethod,
    contentType?: ContentType,
    data?: FormData | Record<string, string> | null,
    csrfToken?: string,
    headers?: JQuery.PlainObject<string> | null
}

interface BackendResponse extends Record<string, unknown> {
    ok: boolean,
    message?: string,
    error?: string
}

export const sendFormPostRequest = async (url: string, data: FormData, config?: AxiosRequestConfig<FormData>) => {
    const res = await axios.post<BackendResponse>(url, data, config)
    return res.data
}

// Функция для отправки AJAX запросов с клиента
export const sendWindowAJAX = (
    url: string,
    options: AJAXOptions = { method: 'GET', contentType: 'application/x-www-form-urlencoded' },
    callbackSuccess?: (res: DefaultAJAXResponse) => void,
    callbackError?: (res: string) => void
) => {
    let finalData: Record<string, unknown> | FormData

    if (!options.contentType) options.contentType = 'application/x-www-form-urlencoded'

    if (options.data instanceof FormData && options.contentType === 'application/x-www-form-urlencoded') {
        finalData = transformFormData(options.data)
        if (options.csrfToken) finalData.csrf = options.csrfToken
    }
    else if (options.data && options.data instanceof FormData) {
        finalData = options.data
        if (options.csrfToken) finalData.set('csrf', options.csrfToken)
    }

    const request = ajax({
        url: url,
        contentType: options.contentType === 'multipart/form-data' ? false : options.contentType,
        headers: options.headers || {},
        type: options.method,
        data: finalData,
        dataType: 'json',
        processData: options.contentType === 'multipart/form-data' ? false : true
    })

    request.done((res) => {
        if (res.ok === true) {
            if (callbackSuccess) callbackSuccess(res)
        }
        else if (res.ok === false) {
            if (callbackError) callbackError(res)
            console.error(res)
        }
        else {
            if (callbackSuccess) callbackSuccess(res)
        }
    })

    request.fail((jqXHR) => {
        if (callbackError) callbackError(
            (jqXHR.responseJSON && jqXHR.responseJSON.error) ? jqXHR.responseJSON.error : jqXHR.responseText
        )
    })
}

// Функция для отправки AJAX запросов с сервера
export const sendNodeAJAX = async (
    url: string,
    method: RESTMethod,
    data?: Record<string, string>,
    headers?: Record<string, string>
): Promise<Record<string, unknown>> => {
    if (!headers) headers = {}
    const response = await axios({ method, url, headers, data })
    return response.data
}

const redirectDelay = 500
export const redirect = (location: string) => setTimeout(() => { window.location.href = location }, redirectDelay)

const doubleDigit = (num: number): string => num < 10 ? `0${num}` : num.toString()

export const formatDate = (date: Date): string => `${doubleDigit(date.getDate())}.${doubleDigit(date.getMonth() + 1)}.${date.getFullYear()}`

export const encodeQuery = (data: Record<string, string>): string => {
    delete data['page']
    const ret = []
    for (const d in data) {
        if (data[d] && data[d] !== '')
            ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]))
    }
    return ret.join('&')
}

export const sortByName = (a: Program, b: Program): number => {
    if (a.title < b.title) return -1
    if (a.title > b.title) return 1
    return 0
}

export const countPlaces = (places: string[][]): number => {
    let total = 0
    places.forEach(modePlaces => total += modePlaces.reduce((acc: number, cur: string) => acc + +cur, 0))
    return total
}

export const sortByPlaces = (a: Program, b: Program): number => {
    if (countPlaces(a.vacantSpots) > countPlaces(b.vacantSpots)) return -1
    if (countPlaces(a.vacantSpots) < countPlaces(b.vacantSpots)) return 1
    return 0
}

export const getPriceNumber = (price: string): number => {
    let nums = ''
    for (let i = 0; i < price.length; i++) {
        if (price[i].match(/\d/)) nums += price[i]
    }
    return +nums
}

export const sortByPrice = (a: Program, b: Program): number => {
    if (getPriceNumber(a.price[0]) < getPriceNumber(b.price[0])) return -1
    if (getPriceNumber(a.price[0]) > getPriceNumber(b.price[0])) return 1
    return 0
}

export const range = (start: number, end: number): number[] => {
    const result = []
    for (let i = start; i <= end; i++) {
        result.push(i)
    }
    return result
}

export const getSequentialPartialIndexes = <T>(arr: T[], size: number): number[][] => {
    const result = []
    let i = 0
    while (i < arr.length) {
        const end = (i + size - 1) < arr.length ? (i + size - 1) : arr.length - 1
        result.push(range(i, end))
        i += size
    }
    return result
}