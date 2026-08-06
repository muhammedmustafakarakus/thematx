"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, Users, Clock, MapPin, ChevronRight, Play, X, Info } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { motion, AnimatePresence } from 'framer-motion';

function extractYouTubeId(url: string | null) {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  return match ? match[1] : null;
}

export default function CampListClient({ camps }: { camps: any[] }) {
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  if (!camps || camps.length === 0) {
    return <div className="text-center py-20 text-muted">Şu an aktif kamp bulunmuyor.</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {camps.map((camp) => {
          const isFull = camp.capacity_registered >= camp.capacity_total;
          const youtubeId = extractYouTubeId(camp.video_url);

          return (
            <Card 
              key={camp.id} 
              hover={!isFull} 
              className={`flex flex-col h-full overflow-hidden ${isFull ? 'opacity-80 grayscale-[0.5]' : ''}`}
            >
              <div className="h-56 relative overflow-hidden bg-black flex-shrink-0 group">
                <img 
                  src={`https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=500&q=80&auto=format&fit=crop&crop=entropy&sig=${camp.id}`} 
                  alt={camp.title} 
                  className={`w-full h-full object-cover transition-transform duration-700 ${youtubeId ? 'opacity-80 group-hover:scale-105 group-hover:opacity-60' : 'group-hover:scale-105'}`} 
                />
                
                {youtubeId && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button 
                      onClick={() => setSelectedVideoId(youtubeId)}
                      className="w-16 h-16 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-glow-lg hover:scale-110 transition-transform duration-300 backdrop-blur-sm"
                    >
                      <Play className="w-6 h-6 ml-1" />
                    </button>
                  </div>
                )}
                
                <div className="absolute top-4 right-4">
                  <Badge variant={!isFull ? 'success' : 'warning'} className="shadow-lg backdrop-blur-md bg-white/90 border-none">
                    {!isFull ? 'Kayıtlar Açık' : 'Kontenjan Dolu'}
                  </Badge>
                </div>
                
                {isFull && (
                  <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex items-center justify-center z-10">
                    <Badge variant="warning" className="text-lg py-2 px-4 shadow-lg">KONTENJAN DOLDU</Badge>
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-heading text-xl font-bold text-foreground mb-3 line-clamp-2">
                  {camp.title}
                </h3>
                
                <p className="text-muted text-sm mb-6 line-clamp-3 flex-grow">
                  {camp.description}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-foreground">
                    <Calendar className="w-4 h-4 text-primary mr-3 shrink-0" />
                    <span>{camp.date_range}</span>
                  </div>
                  <div className="flex items-center text-sm text-foreground">
                    <Clock className="w-4 h-4 text-primary mr-3 shrink-0" />
                    <span>{camp.duration}</span>
                  </div>
                  <div className="flex items-center text-sm text-foreground">
                    <MapPin className="w-4 h-4 text-primary mr-3 shrink-0" />
                    <span>{camp.location}</span>
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-border">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted flex items-center gap-1">
                      <Users className="w-4 h-4" /> Kontenjan
                    </span>
                    <span className="font-medium">
                      {camp.capacity_registered} / {camp.capacity_total}
                    </span>
                  </div>
                  <div className="w-full bg-surface h-2 rounded-full overflow-hidden mb-6 border border-border">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${isFull ? 'bg-error' : 'bg-success'}`}
                      style={{ width: `${(camp.capacity_registered / camp.capacity_total) * 100}%` }}
                    ></div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    {youtubeId && !isFull && (
                      <Button 
                        variant="secondary" 
                        className="flex-1"
                        onClick={() => setSelectedVideoId(youtubeId)}
                      >
                        <Play className="w-4 h-4 mr-1.5" />
                        Bilgi Al
                      </Button>
                    )}
                    <a 
                      href={`https://wa.me/905068530441?text=${encodeURIComponent(`Merhaba, ${camp.title} kampına kayıt olmak istiyorum.`)}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`block ${youtubeId && !isFull ? 'flex-1' : 'w-full'}`}
                    >
                      <Button 
                        variant={isFull ? "outline" : "primary"} 
                        className="w-full group px-2"
                        disabled={isFull}
                      >
                        {isFull ? 'Kontenjan Dolu' : 'Hemen Al'}
                        {!isFull && <ChevronRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />}
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedVideoId && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-background/95 backdrop-blur-md"
          >
            <button 
              onClick={() => setSelectedVideoId(null)}
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-surface/50 text-foreground hover:bg-surface transition-colors z-50 border border-border"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="w-full h-full flex flex-col items-center justify-center max-w-6xl">
              <motion.div 
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="w-full bg-black rounded-2xl overflow-hidden shadow-2xl relative aspect-video"
              >
                <iframe 
                  className="w-full h-full absolute inset-0"
                  src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1`} 
                  title="Kamp Tanıtım Videosu"
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 text-center"
              >
                <p className="text-muted-light mb-4">Videoyu izlediniz mi? Haydi kaydınızı oluşturalım.</p>
                <a 
                  href="https://wa.me/905068530441?text=Merhaba, tanıtım videosunu izledim ve kayıt olmak istiyorum."
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button variant="primary" size="lg">
                    <ChevronRight className="w-5 h-5 mr-1" />
                    Hemen Kayıt Ol
                  </Button>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
