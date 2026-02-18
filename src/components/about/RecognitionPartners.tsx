import { motion } from 'framer-motion';

const awards = [
  { title: 'Innovative Education Platform', org: 'Pakistan EdTech Summit 2024' },
  { title: 'Best O-Level Preparation Platform', org: 'Education Excellence Awards 2023' },
  { title: 'Social Impact Startup', org: 'Lahore Startup Week 2022' },
];

const partners = [
  'University of Education Lahore',
  'Cambridge Assessment International Education',
  'MDCAT/ECAT Preparation Bodies',
];

const media = ['The News International', 'Express Tribune', 'Dawn', 'EdSurge'];

const RecognitionPartners = () => (
  <section className="bg-light-blue section-padding-lg">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-[42px] font-extrabold font-heading text-foreground mb-4">
          Trusted By
        </h2>
      </div>

      {/* Academic Partners */}
      <div className="mb-12">
        <h3 className="text-lg font-bold font-heading text-foreground text-center mb-6">Academic Partners</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {partners.map(p => (
            <div key={p} className="bg-card border border-border rounded-lg px-5 py-3 text-sm font-medium text-foreground shadow-sm">
              {p}
            </div>
          ))}
        </div>
      </div>

      {/* School partners placeholder */}
      <div className="mb-12 text-center">
        <h3 className="text-lg font-bold font-heading text-foreground mb-4">200+ Partner Schools Across Pakistan</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="w-24 h-16 bg-card border border-border rounded-lg flex items-center justify-center text-xs text-muted-foreground shadow-sm">
              School {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Awards */}
      <div className="mb-12">
        <h3 className="text-lg font-bold font-heading text-foreground text-center mb-6">Recognition & Awards</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-3xl mx-auto">
          {awards.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border-2 border-gold rounded-xl p-5 text-center shadow-sm"
            >
              <div className="text-3xl mb-2">🏆</div>
              <h4 className="text-sm font-bold font-heading text-foreground mb-1">{a.title}</h4>
              <p className="text-xs text-muted-foreground">{a.org}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Media */}
      <div className="text-center">
        <h3 className="text-lg font-bold font-heading text-foreground mb-4">As Featured In</h3>
        <div className="flex flex-wrap justify-center gap-6">
          {media.map(m => (
            <span key={m} className="text-sm font-semibold text-muted-foreground">{m}</span>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default RecognitionPartners;
