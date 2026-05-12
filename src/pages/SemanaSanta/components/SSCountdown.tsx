import { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function SSCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      // 16 abril 2026, 00:00:00
      const targetDate = new Date('2026-04-16T00:00:00').getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
        <span className="text-3xl md:text-4xl font-bold text-white">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="text-sm md:text-base font-semibold text-gray-700 mt-2 uppercase tracking-wide">
        {label}
      </span>
    </div>
  );

  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-blue-50 to-cyan-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Cuenta Regresiva
          </h2>
          <p className="text-gray-600">Faltan solo:</p>
        </div>

        {/* Countdown boxes */}
        <div className="flex justify-center gap-4 md:gap-6 flex-wrap">
          <TimeBox value={timeLeft.days} label="Días" />
          <TimeBox value={timeLeft.hours} label="Horas" />
          <TimeBox value={timeLeft.minutes} label="Minutos" />
          <TimeBox value={timeLeft.seconds} label="Segundos" />
        </div>

        {/* Message */}
        <div className="text-center mt-12">
          <p className="text-gray-700 max-w-2xl mx-auto">
            No pierdas esta oportunidad. Las plazas son limitadas y se agotan rápidamente.
            ¡Reserva tu habitación ahora!
          </p>
        </div>
      </div>
    </section>
  );
}
