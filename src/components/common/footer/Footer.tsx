export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-lg font-semibold mb-4 text-purple-400">Peças populares</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:underline">Placa-mãe</a></li>
            <li><a href="#" className="hover:underline">Processador</a></li>
            <li><a href="#" className="hover:underline">Memória RAM</a></li>
            <li><a href="#" className="hover:underline">Placa de vídeo</a></li>
            <li><a href="#" className="hover:underline">SSD / HD</a></li>
            <li><a href="#" className="hover:underline">Fonte</a></li>
            <li><a href="#" className="hover:underline">Gabinete</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4 text-purple-400">TrackSave</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:underline">Sobre nós</a></li>
            <li><a href="#" className="hover:underline">Como funciona</a></li>
            <li><a href="#" className="hover:underline">Termos de uso</a></li>
            <li><a href="#" className="hover:underline">Política de privacidade</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4 text-purple-400">Ajuda</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:underline">Central de suporte</a></li>
            <li><a href="#" className="hover:underline">Contato</a></li>
            <li><a href="#" className="hover:underline">Dúvidas frequentes</a></li>
          </ul>
        </div>

        <div className="flex flex-col items-start">
          <h4 className="text-lg font-semibold mb-4 text-purple-400">Conecte-se</h4>
          <div className="flex space-x-4 text-gray-300">
            <a href="#" className="hover:text-white"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="hover:text-white"><i className="fab fa-twitter"></i></a>
            <a href="#" className="hover:text-white"><i className="fab fa-instagram"></i></a>
            <a href="#" className="hover:text-white"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400 px-4">
        © {new Date().getFullYear()} TrackSave. Todos os direitos reservados.
      </div>
    </footer>
  );
}
