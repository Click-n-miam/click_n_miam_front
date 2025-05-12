"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Mail } from 'lucide-react';
import {User} from "@/entities/User";

import { useAuth } from "@/contexts/AuthContext";

export default function HomePage() {

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const { user, handleLogin } = useAuth();

  useEffect(() => {
    if(user)
    {
      alert('already connected');
    }

  }, []);

  const handleSubmit = () => {
    setIsLoading(true);
    try{
      const attemptUser: User = {
        email: email + '@lycee-ndduroc.com',
      }
      handleLogin({user: attemptUser});
      setIsLoading(false);
      router.push('/daySelection')

    }catch(err){
      setError('Une erreur est survenue.');
      setIsLoading(false);
      console.log(err);
    }
  }

  return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-orange-500 p-6 text-white text-center">
            <h2 className="text-2xl font-bold">Bienvenue sur Click`n`Miam : {user?.email}</h2>
            <p className="mt-2">Connecte toi avec l`email du campus pour passer commande !</p>
          </div>

          <div className="p-6">
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Votre mail du campus
                </label>
                <div className="relative flex text-center align-middle">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400"/>
                  </div>
                  <input
                      id="email"
                      type="text"
                      placeholder="nnnnnJJpp"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`pl-10 w- py-2 px-3 border ${
                          error ? 'border-red-300' : 'border-gray-300'
                      } rounded-none rounded-l-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500`}
                  />
                  <span className="inline-flex items-center px-3 text-sm text-gray-400  border rounded-e-0 border-gray-300 border-l-0 rounded-r-md ">
                     @lycee-ndduroc.com
                  </span>
                </div>

                {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
              </div>

              <button
                  type="submit"
                  disabled={isLoading}
                  onClick={() => handleSubmit()}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Chargement...' : 'Se connecter'}
              </button>
            </div>

            <div className="mt-4 text-sm text-center text-gray-500">
              <p>Seulement les mails du campus (@lycee-ndduroc.com) sont autorisés</p>
            </div>
          </div>
        </div>
      </div>
  );
};