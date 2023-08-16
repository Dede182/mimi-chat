import Echo from 'laravel-echo'; // Assuming you have 'laravel-echo' installed


export interface EchoContract {
    echo : Echo | null;

    getEcho() : Echo | null;
}