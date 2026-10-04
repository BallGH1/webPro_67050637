function Profile() {
  return (
    <div className="bg-white p-8 rounded-xl shadow max-w-md mx-auto text-center mt-6">
      <div className="text-6xl mb-4">
        👤
      </div>
      <h2 className="text-2xl font-bold text-gray-800">
        Assanai 
      </h2>
      <p className="text-gray-500 mt-2">
        Asball@email.com
      </p>
      <p className="text-gray-500 mt-1">
        Student ID: 67050637
      </p>
      <div className="mt-6 border-t pt-4 text-left">
        <h3 className="font-bold text-gray-700 mb-2">Account Summary</h3>
        <p className="text-gray-600">Total Orders: 128</p>
        <p className="text-gray-600">Points: 320</p>
      </div>
    </div>
  )
}

export default Profile
