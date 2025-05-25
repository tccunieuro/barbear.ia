
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Service {
  name: string;
  count: number;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
}

interface ServiceRankingProps {
  services: Service[];
}

export const ServiceRanking: React.FC<ServiceRankingProps> = ({ services }) => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getRankColor = (index: number) => {
    switch (index) {
      case 0:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 1:
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 2:
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Trophy className="h-5 w-5 text-trinks-orange" />
          <span>Top 3 Serviços Mais Realizados</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {services.slice(0, 3).map((service, index) => (
            <div
              key={service.name}
              className="flex items-center justify-between p-3 rounded-lg border bg-gray-50/50"
            >
              <div className="flex items-center space-x-3">
                <Badge 
                  variant="outline" 
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${getRankColor(index)}`}
                >
                  {index + 1}
                </Badge>
                <div>
                  <p className="font-medium text-gray-900">{service.name}</p>
                  <p className="text-sm text-gray-600">
                    {service.count} realizações ({service.percentage}%)
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getTrendIcon(service.trend)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
