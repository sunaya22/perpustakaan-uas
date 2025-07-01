import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Book, Users, CalendarCheck, LibraryBig } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  // Data statistik (bisa diganti dengan data real dari API)
  const stats = [
    { title: "Total Buku", value: "1,240", icon: <Book className="h-6 w-6" />, link: "/buku" },
    { title: "Total Anggota", value: "568", icon: <Users className="h-6 w-6" />, link: "/anggota" },
    { title: "Peminjaman Aktif", value: "189", icon: <CalendarCheck className="h-6 w-6" />, link: "/peminjaman" },
    { title: "Koleksi Terbaru", value: "42", icon: <LibraryBig className="h-6 w-6" />, link: "/buku" },
  ];

  const quickActions = [
    { title: "Tambah Buku Baru", description: "Tambahkan buku baru ke katalog", icon: <Book className="h-5 w-5" />, link: "/buku/tambah" },
    { title: "Daftarkan Anggota", description: "Buat akun anggota baru", icon: <Users className="h-5 w-5" />, link: "/anggota/tambah" },
    { title: "Proses Peminjaman", description: "Catat peminjaman buku", icon: <CalendarCheck className="h-5 w-5" />, link: "/peminjaman/tambah" },
    { title: "Lihat Laporan", description: "Akses laporan sistem", icon: <LibraryBig className="h-5 w-5" />, link: "/laporan" },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Selamat Datang di Sistem Perpustakaan Digital</h1>
          <p className="text-xl mb-6">Kelola koleksi buku, anggota, dan peminjaman dengan mudah dan efisien</p>
          <div className="flex gap-4 justify-center">
            <Button asChild variant="secondary">
              <Link href="/buku">Jelajahi Koleksi</Link>
            </Button>
            <Button asChild variant="outline" className="text-white border-white hover:bg-white/10">
              <Link href="/peminjaman">Lihat Peminjaman</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Ringkasan Sistem</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {stat.title}
                </CardTitle>
                <div className="text-primary">
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <Link href={stat.link} className="text-sm text-primary hover:underline mt-2 inline-block">
                  Lihat detail
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Aksi Cepat</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow group">
              <Link href={action.link}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                      {action.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{action.title}</CardTitle>
                      <CardDescription className="text-sm">{action.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Aktivitas Terkini</h2>
        <Card>
          <CardHeader>
            <CardTitle>Riwayat Peminjaman</CardTitle>
            <CardDescription>5 peminjaman terakhir yang diproses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div>
                    <p className="font-medium">Anggota #{item} meminjam buku "Judul Buku {item}"</p>
                    <p className="text-sm text-gray-500">2 hari yang lalu</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Detail
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="link" asChild>
                <Link href="/peminjaman">Lihat Semua Peminjaman</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}